function cleanText(text) {
      if (!text) return "";

        let cleaned = text;

          // حذف لینک‌های تلگرامی
            cleaned = cleaned.replace(
                /(https?:\/\/)?(www\.)?(t\.me|telegram\.me)\/[^\s]+/gi,
                    ""
                      );

                        // حذف آیدی‌های تلگرامی مثل @channelname
                          cleaned = cleaned.replace(
                              /@[a-zA-Z0-9_]+/g,
                                  ""
                                    );

                                      // حذف فاصله‌های اضافی
                                        cleaned = cleaned.replace(
                                            /\n\s*\n\s*\n+/g,
                                                "\n\n"
                                                  );

                                                    // حذف فاصله اول و آخر
                                                      cleaned = cleaned.trim();

                                                        return cleaned;
                                                        }

                                                        module.exports = {
                                                          cleanText,
                                                          };