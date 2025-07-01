export function formatDate(date: Date) {
	return Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "2-digit",
		year: "numeric",
	}).format(date);
}
