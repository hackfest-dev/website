function getUrlAndId(data: string) {
  return {
    url: data.split(";")[0] ?? "",
    public_id: data.split(";")[1] ?? "",
  };
}

export { getUrlAndId };
