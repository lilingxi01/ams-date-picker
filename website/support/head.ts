export const getHeadTitle = (title: string | null = null) => {
  if (!title) {
    return 'Ams Date Picker';
  }
  return `${title} | Ams Date Picker`;
};
