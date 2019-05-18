const required = (v: any) => !!v || 'Cette information est nécessaire.';
const requiredShort = (v: any) => !!v || 'Requis';
const min = (v: string) => v.length >= 8 || 'Min 8 characters';

const email = (v: string) => {
  // tslint:disable-next-line:max-line-length
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(v) || 'Invalid e-mail.';
};

export const Rules = {
  required,
  requiredShort,
  min,
  email,
};
