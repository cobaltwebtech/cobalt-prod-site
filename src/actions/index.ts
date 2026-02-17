import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";
import { contactEmailTemplate } from "@/lib/contact-email";
import { leadFormEmailTemplate } from "@/lib/lead-form-email";
import {
	buildLeadFormSlackPayload,
	sendSlackNotification,
} from "@/lib/slack-notification";
import { supportEmailTemplate } from "@/lib/support-email";

// Validate required environment variables
if (!import.meta.env.RESEND_API_KEY) {
	throw new Error("RESEND_API_KEY is not defined in environment variables");
}
if (!import.meta.env.TURNSTILE_SECRET_KEY) {
	throw new Error(
		"TURNSTILE_SECRET_KEY is not defined in environment variables",
	);
}
if (!import.meta.env.SLACK_WEBHOOK_URL) {
	throw new Error("SLACK_WEBHOOK_URL is not defined in environment variables");
}

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

const leadFormSchema = z.object({
	leadtype: z.enum(
		[
			"Business",
			"Non-Profit",
			"Self Employed",
			"Govt/Public Entity",
			"Individual",
		],
		{ required_error: "Please select an entity type" },
	),
	entityname: z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
	firstname: z.string().min(1, "First name is required"),
	lastname: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address"),
	phone: z.string().min(1, "Phone number is required"),
	businessphone: z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
	// Website type checkboxes - handle null/undefined/missing
	services: z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
	blog: z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
	ecommerce: z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
	"content-creator": z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
	personal: z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
	political: z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
	"non-profit": z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
	"subscription-membership": z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
	"news-media": z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
	"customer-portal": z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
	"general-business": z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
	// Current website info
	haswebsite: z.enum(["Yes", "No"], {
		required_error: "Please select if you have a website",
	}),
	domain: z.string().min(1, "Domain name is required"),
	"domain-registrar": z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
	"current-host": z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
	// Infrastructure needs
	estimatedtraffic: z
		.enum([
			"Less than 1K",
			"1K - 10K",
			"10K - 50K",
			"50K - 100K",
			"100K - 500K",
			"More than 500K",
		])
		.optional(),
	database: z.enum(["Yes", "No"]).optional(),
	objectstorage: z.enum(["Yes", "No"]).optional(),
	thirdpartyintegrations: z.enum(["Yes", "No", "Unknown"]).optional(),
	"integration-name": z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
	paymentprocessor: z.enum(["Yes", "No"]).optional(),
	// Regulatory compliance
	intlrequire: z.enum(["Yes", "No", "Unknown"]).optional(),
	languages: z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
	// Additional info
	message: z
		.string()
		.nullish()
		.transform((val) => val ?? ""),
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
	sendLeadForm: defineAction({
		accept: "form",
		input: leadFormSchema,
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
			const emailHtml = leadFormEmailTemplate(input);

			// Send email via Resend
			const { data, error } = await resend.emails.send({
				from: "Cobalt Web Technologies <notifications@contact.cobaltweb.tech>",
				to: "leads@cobaltweb.tech",
				subject: `New Lead Form Submission: ${input.firstname} ${input.lastname}`,
				html: emailHtml,
				replyTo: input.email,
			});

			// Prepare and send Slack notification (fire and forget - don't wait for response)
			const errorMessage = error ? error.message || String(error) : null;
			const slackPayload = buildLeadFormSlackPayload(input, errorMessage);
			sendSlackNotification(slackPayload, import.meta.env.SLACK_WEBHOOK_URL);

			if (error) {
				console.error("Resend error:", error);
				throw new ActionError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to send email. Please try again later.",
				});
			}

			console.log(
				`Lead form email sent successfully. Resend email ID: ${data?.id}`,
			);
			return {
				success: true,
				message: "Your lead form has been submitted successfully!",
				emailId: data?.id,
			};
		},
	}),
};
