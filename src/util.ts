export const generateQueryParams = (
  options: { [key: string]: string } | undefined
) => {
  if (!options || !Object.values(options).length) {
    return "";
  }

  return (
    "?" +
    Object.entries(options)
      .map(([key, value]) => `${key}=${value === "undefined" ? "" : value}`)
      .join("&")
  );
};

export const getErrorMessage = (error: any) =>
  error?.response?.data?.message || "Something went wrong";
