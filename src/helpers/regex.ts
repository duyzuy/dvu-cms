export const removeSpecialChar = (str: string) => {
  return str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
};

export const removeScriptTag = (str: string) => {
  const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

  return str.replace(SCRIPT_REGEX, '');
};
