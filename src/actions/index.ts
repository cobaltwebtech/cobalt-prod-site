import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";
import { contactEmailTemplate } from "@/lib/contact-email";
import { supportEmailTemplate } from "@/lib/support-email";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Validate form inputs with Zod
const contactFormSchema = z.object({
	firstname: z.string().min(1, "First name is required"),
	lastname: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address"),
	phone: z.string().min(1, "Phone number is required"),
	message: z.string().min(1, "Please give additional info"),
	"cf-turnstile-response": z
		.string({ required_error: "CAPTCHA verification is required" })
		.min(1, "CAPTCHA verification is required"),
});
const supportFormSchema = z.object({
	supporttype: z.enum(["Technical", "Billing"], {
		required_error: "Please select a support type",
	}),
	firstname: z.string().min(1, "First name is required"),
	lastname: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address"),
	phone: z.string().min(1, "Phone number is required"),
	message: z.string().min(1, "Please give additional info"),
	"cf-turnstile-response": z
		.string({ required_error: "CAPTCHA verification is required" })
		.min(1, "CAPTCHA verification is required"),
});

// Verify Cloudflare Turnstile token
async function verifyTurnstileToken(token: string): Promise<boolean> {
	const secretKey = import.meta.env.TURNSTILE_SECRET_KEY;

	const formData = new FormData();
	formData.append("secret", secretKey);
	formData.append("response", token);

	try {
		const result = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{
				method: "POST",
				body: formData,
			},
		);

		const outcome = (await result.json()) as { success: boolean };
		return outcome.success;
	} catch (error) {
		console.error("Turnstile verification error:", error);
		return false;
	}
}

export const server = {
	sendContactForm: defineAction({
		accept: "form",
		input: contactFormSchema,
		handler: async (input) => {
			// Verify Turnstile token server-side
			const isValidToken = await verifyTurnstileToken(
				input["cf-turnstile-response"],
			);

			if (!isValidToken) {
				throw new ActionError({
					code: "UNAUTHORIZED",
					message: "CAPTCHA verification failed. Please try again.",
				});
			}

			// Use the email template function to generate HTML
			const emailHtml = contactEmailTemplate(input);

			// Send email via Resend
			const { data, error } = await resend.emails.send({
				from: "Cobalt Web Technologies <notifications@contact.cobaltweb.tech>",
				to: "info@cobaltweb.tech",
				subject: `New Contact Form Submission: ${input.firstname} ${input.lastname}`,
				html: emailHtml,
				replyTo: input.email,
			});

			if (error) {
				console.error("Resend error:", error);
				throw new ActionError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to send email. Please try again later.",
				});
			}

			console.log(
				`Contact form email sent successfully. Resend email ID: ${data?.id}`,
			);
			return {
				success: true,
				message: "Your message has been sent successfully!",
				emailId: data?.id,
			};
		},
	}),
	sendSupportForm: defineAction({
		accept: "form",
		input: supportFormSchema,
		handler: async (input) => {
			// Verify Turnstile token server-side
			const isValidToken = await verifyTurnstileToken(
				input["cf-turnstile-response"],
			);

			if (!isValidToken) {
				throw new ActionError({
					code: "UNAUTHORIZED",
					message: "CAPTCHA verification failed. Please try again.",
				});
			}

			// Use the email template function to generate HTML
			const emailHtml = supportEmailTemplate(input);

			// Send email via Resend
			const { data, error } = await resend.emails.send({
				from: "Cobalt Web Technologies <notifications@contact.cobaltweb.tech>",
				to: "info@cobaltweb.tech",
				subject: `New Support Form Submission: ${input.firstname} ${input.lastname}`,
				html: emailHtml,
				replyTo: input.email,
			});

			if (error) {
				console.error("Resend error:", error);
				throw new ActionError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to send email. Please try again later.",
				});
			}

			console.log(
				`Support form email sent successfully. Resend email ID: ${data?.id}`,
			);
			return {
				success: true,
				message: "Your message has been sent successfully!",
				emailId: data?.id,
			};
		},
	}),
};
