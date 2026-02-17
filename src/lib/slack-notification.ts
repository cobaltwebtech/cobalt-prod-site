// Types and JSON payload construction for the Slack notification
// of lead form submissions
type LeadFormInput = {
	leadtype:
		| "Business"
		| "Non-Profit"
		| "Self Employed"
		| "Govt/Public Entity"
		| "Individual";
	entityname: string;
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
	businessphone: string;
	services?: string;
	blog?: string;
	ecommerce?: string;
	"content-creator"?: string;
	personal?: string;
	political?: string;
	"non-profit"?: string;
	"subscription-membership"?: string;
	"news-media"?: string;
	"customer-portal"?: string;
	"general-business"?: string;
	haswebsite: "Yes" | "No";
	domain: string;
	"domain-registrar": string;
	"current-host": string;
	estimatedtraffic?:
		| "Less than 1K"
		| "1K - 10K"
		| "10K - 50K"
		| "50K - 100K"
		| "100K - 500K"
		| "More than 500K";
	database?: "Yes" | "No";
	objectstorage?: "Yes" | "No";
	thirdpartyintegrations?: "Yes" | "No" | "Unknown";
	"integration-name": string;
	paymentprocessor?: "Yes" | "No";
	intlrequire?: "Yes" | "No" | "Unknown";
	languages: string;
	message: string;
};

type SlackBlock =
	| {
			type: "header";
			text: {
				type: "plain_text";
				text: string;
				emoji: boolean;
			};
	  }
	| {
			type: "section";
			fields?: Array<{
				type: "mrkdwn";
				text: string;
			}>;
			text?: {
				type: "mrkdwn";
				text: string;
			};
	  };

type SlackPayload = {
	blocks: SlackBlock[];
};

export function buildLeadFormSlackPayload(
	input: LeadFormInput,
	emailError?: string | null,
): SlackPayload {
	const websiteTypes = [
		input.services && "Services",
		input.blog && "Blog",
		input.ecommerce && "E-commerce",
		input["content-creator"] && "Content Creator",
		input.personal && "Personal",
		input.political && "Political",
		input["non-profit"] && "Non-Profit",
		input["subscription-membership"] && "Subscription or Membership",
		input["news-media"] && "News Media",
		input["customer-portal"] && "Customer Portal",
		input["general-business"] && "General Business",
	].filter(Boolean);

	const blocks: SlackBlock[] = [
		{
			type: "header",
			text: {
				type: "plain_text",
				text: "🎯 New Lead Form Submission",
				emoji: true,
			},
		},
		{
			type: "section",
			fields: [
				{
					type: "mrkdwn",
					text: `*Entity Type:*\n${input.leadtype}`,
				},
				{
					type: "mrkdwn",
					text: `*Name:*\n${input.firstname} ${input.lastname}`,
				},
				{
					type: "mrkdwn",
					text: `*Email:*\n${input.email}`,
				},
				{
					type: "mrkdwn",
					text: `*Phone:*\n${input.phone}`,
				},
				{
					type: "mrkdwn",
					text: `*Has Website:*\n${input.haswebsite}`,
				},
				{
					type: "mrkdwn",
					text: `*Domain:*\n${input.domain}`,
				},
			],
		},
	];

	// Add optional fields
	if (input.entityname) {
		blocks.push({
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*Business/Entity Name:*\n${input.entityname}`,
			},
		});
	}

	if (websiteTypes.length > 0) {
		blocks.push({
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*Website Types:*\n${websiteTypes.join(", ")}`,
			},
		});
	}

	if (input.businessphone) {
		blocks.push({
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*Business Phone:*\n${input.businessphone}`,
			},
		});
	}

	if (input["domain-registrar"]) {
		blocks.push({
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*Domain Registrar:*\n${input["domain-registrar"]}`,
			},
		});
	}

	if (input["current-host"]) {
		blocks.push({
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*Current Host:*\n${input["current-host"]}`,
			},
		});
	}

	if (input.estimatedtraffic) {
		blocks.push({
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*Estimated Traffic:*\n${input.estimatedtraffic}`,
			},
		});
	}

	if (input.database) {
		blocks.push({
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*Database Required:*\n${input.database}`,
			},
		});
	}

	if (input.objectstorage) {
		blocks.push({
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*Object Storage Required:*\n${input.objectstorage}`,
			},
		});
	}

	if (input.thirdpartyintegrations) {
		blocks.push({
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*Third Party Integrations:*\n${input.thirdpartyintegrations}`,
			},
		});
	}

	if (input["integration-name"]) {
		blocks.push({
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*Integration Details:*\n${input["integration-name"]}`,
			},
		});
	}

	if (input.paymentprocessor) {
		blocks.push({
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*Payment Processing Required:*\n${input.paymentprocessor}`,
			},
		});
	}

	if (input.intlrequire) {
		blocks.push({
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*International Requirements:*\n${input.intlrequire}`,
			},
		});
	}

	if (input.languages) {
		blocks.push({
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*Languages Required:*\n${input.languages}`,
			},
		});
	}

	if (input.message) {
		blocks.push({
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*Additional Information:*\n${input.message}`,
			},
		});
	}

	// Add email status
	blocks.push({
		type: "section",
		text: {
			type: "mrkdwn",
			text: `*Email Status:*\n${emailError ? `❌ Failed to send email\nError: ${emailError}` : "✅ Email sent successfully"}`,
		},
	});

	return { blocks };
}

export async function sendSlackNotification(
	payload: SlackPayload,
	webhookUrl: string,
): Promise<void> {
	try {
		await fetch(webhookUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
	} catch (err) {
		console.error("Slack webhook error:", err);
		// Don't throw - Slack notification failure should not block the response
	}
}
