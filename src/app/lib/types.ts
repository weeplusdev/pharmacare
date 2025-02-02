export interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
    category: string
    stock: number
  }
  
  export interface CartItem extends Product {
    quantity: number
  }

  export interface User {
    id: string;
    lineId: string;
    displayName: string;
    email?: string;
    role: 'customer' | 'doctor';
    medicalLicenseId?: string;
    hospital?: string;
    isVerified?: boolean;
    createdAt: Date;
  }
  
  export interface Prescription {
    id: string;
    doctorId: string;
    patientName: string;
    patientId?: string;
    medications: PrescriptionMedication[];
    diagnosis: string;
    notes?: string;
    status: 'pending' | 'approved' | 'rejected' | 'filled';
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface PrescriptionMedication {
    medicationId: string;
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    quantity: number;
  }