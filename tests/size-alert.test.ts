import { expect, test } from "bun:test";
import { isChatGptSizeAlertText } from "../src/adapters/chatgpt-web/size-alert";

test("size alerts are recognized in every supported UI language", () => {
  expect(isChatGptSizeAlertText("The message you submitted was too long, please edit it and resubmit.")).toBe(true);
  expect(isChatGptSizeAlertText("A mensagem enviada era longa demais. Edite-a e reenvie.")).toBe(true);
  expect(isChatGptSizeAlertText("  A mensagem enviada era longa demais. Edite-a e reenvie.  ")).toBe(true);
});

test("a size alert on its own line survives an extra label line", () => {
  expect(isChatGptSizeAlertText("Erro\nA mensagem enviada era longa demais. Edite-a e reenvie.")).toBe(true);
});

test("size alerts never match quoted or surrounding prose", () => {
  expect(isChatGptSizeAlertText("")).toBe(false);
  expect(isChatGptSizeAlertText("The model said: A mensagem enviada era longa demais. Edite-a e reenvie.")).toBe(false);
  expect(isChatGptSizeAlertText("A mensagem enviada era longa demais. Edite-a e reenvie. Tente de novo mais tarde.")).toBe(false);
  expect(isChatGptSizeAlertText("Algo deu errado.")).toBe(false);
});
