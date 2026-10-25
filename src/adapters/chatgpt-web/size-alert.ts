/**
 * Product alert ChatGPT shows when it rejects a submitted message as too large. The text follows
 * the account's UI language, so every supported language needs its own exact sentence. A missed
 * alert is not harmless: the turn then waits for an assistant message that never arrives and fails
 * as "accepted the message but did not expose its assistant turn" instead of the size rejection
 * Codex answers by compacting.
 *
 * Each pattern must match one whole alert line. Add the exact observed sentence for a new language.
 */
export const CHATGPT_SIZE_ALERT_PATTERNS: readonly RegExp[] = [
  /^The message you submitted was too long(?:, please edit it and resubmit)?\.$/,
  // Portuguese UI (observed 2026-10-25): "A mensagem enviada era longa demais. Edite-a e reenvie."
  /^A mensagem enviada era longa demais(?:\. Edite-a e reenvie)?\.$/,
];

/** True when one visible line of the alert is exactly a known size-rejection sentence. */
export function isChatGptSizeAlertText(text: string): boolean {
  return text.split(/\r?\n/)
    .map(line => line.trim())
    .some(line => line !== "" && CHATGPT_SIZE_ALERT_PATTERNS.some(pattern => pattern.test(line)));
}
