'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DoctorRegistration() {
  const [formData, setFormData] = useState({
    email: '',
    medicalLicenseId: '',
    hospital: '',
    specialization: '',
    phoneNumber: ''
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/doctor/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        router.push('/doctor/pending-verification');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ลงทะเบียนสำหรับแพทย์</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">อีเมล</label>
          <input
            type="email"
            className="w-full border rounded p-2"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block mb-1">เลขใบอนุญาตประกอบวิชาชีพเวชกรรม</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={formData.medicalLicenseId}
            onChange={(e) => setFormData({...formData, medicalLicenseId: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block mb-1">โรงพยาบาล/สถานพยาบาล</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={formData.hospital}
            onChange={(e) => setFormData({...formData, hospital: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          ลงทะเบียน
        </button>
      </form>
    </div>
  );
}