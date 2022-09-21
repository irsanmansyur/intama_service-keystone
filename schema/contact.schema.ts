import { text } from "@keystone-6/core/fields";

export const ContactSchema = {
  fields: {
    name: text({
      db: {
        nativeType: "VarChar(20)",
      },
      validation: { isRequired: true },
    }),
    value: text({
      db: {
        nativeType: "VarChar(288)",
      },
      validation: { isRequired: true },
    }),
  },
};
