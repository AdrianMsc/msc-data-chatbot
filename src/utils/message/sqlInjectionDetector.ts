/**
 * sqlInjectionDetector.ts
 *
 * Provides a utility to detect potential SQL injection attempts in chat messages.
 * The sqlInjectionDetector function scans incoming messages and flags any that match
 * common SQL injection patterns while minimizing false positives in normal prose.
 */

// Exportable safe list of phrases to ignore when tuning the detector.
// You can add known-safe patterns or domain-specific keywords here.
export const safeList: string[] = [];

// Array of case-insensitive regex patterns representing suspicious SQL contexts.
const injectionPatterns: RegExp[] = [
	/;\s*--/, // ;-- sequence
	/['"]\s+or\s+['"][\d=\d]+/, // ' OR '1'= '1 type
	/union\s+select/i, // UNION SELECT
	/\b(select|insert|update|delete|drop|truncate|exec|execute)\b.*;/i, // keyword followed by semicolon
	/--/, // SQL single-line comment
	/\/\*/, // start of C-style comment
	/\*\//, // end of C-style comment
	/;\s*\w+\s*=/ // stacked queries, e.g. ; DROP =
];

/**
 * Scans a chat message for SQL injection patterns.
 * @param message - The incoming chat message content.
 * @returns true if the message is flagged as suspicious; false otherwise.
 *
 * @example
 * // Clean message
 * sqlInjectionDetector("Hey team, I selected the best option for our project discussion.");
 * // returns false
 *
 * @example
 * // Injection example
 * sqlInjectionDetector("'; DROP TABLE users; --");
 * // returns true
 */
export function sqlInjectionDetector(message: string): boolean {
	const text = message.trim();
	if (!text) {
		return false; // empty or whitespace-only messages are not flagged
	}

	// If any safeList phrase is present, skip scanning
	for (const safe of safeList) {
		if (text.toLowerCase().includes(safe.toLowerCase())) {
			return false;
		}
	}

	// Check each pattern for a match
	for (const pattern of injectionPatterns) {
		if (pattern.test(text)) {
			return true;
		}
	}

	// No suspicious patterns found
	return false;
}
