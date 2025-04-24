export default interface RegisterInterface {
  client_id: string;
  fullName: string;
  age: number | string;
  phone_number: string;
  gender: string;
}

export interface EnrollInterface {
  program_name: string;
  client_id: string;
}
