export interface Doctor {
    id: string
    age: number
    email: string  
    password: string   
    dateBirth: Date
    address: string
    phone: string
    name: string
    specialty: string
    imagen?: string
  }
  
  export interface DoctorService {
    getAllDoctors: () => Promise<Doctor[]>;
    getDoctor: (id: string) => Promise<Doctor>;
    postDoctor: (data: any) => Promise<Doctor>;
    updateDoctor: ( id: string, data: any ) => Promise<void>;
    deleteDoctor: ( id: string ) => Promise<Doctor>;
  }
  