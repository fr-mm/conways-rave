import { RuleSetFactory } from "domain/factories";
import { RuleSet } from "domain/entities";

test(".buildDefault returns expected RuleSet", () => {
  const ruleSetFactory = new RuleSetFactory();

  const ruleSet = ruleSetFactory.buildDefault();

  expect(ruleSet).toBeInstanceOf(RuleSet);
});
