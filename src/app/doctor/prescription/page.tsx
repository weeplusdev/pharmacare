'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PrescriptionMedication } from '@/app/lib/types';

export default function CreatePrescription() {
  const [prescription, setPrescription] = useState({
    patientName: '',
    patientId: '',
    diagnosis: '',
    medications: [] as PrescriptionMedication[],
    notes: ''
  });

  const [currentMedication, setCurrentMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    quantity: 0
  });

  const addMedication = () => {
    setPrescription({
      ...prescription,
      medications: [...prescription.medications, { ...currentMedication, medicationId: Date.now().toString() }]
    });
    setCurrentMedication({
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      quantity: 0
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prescription),
      });
      
      if (response.ok) {
        // Handle success
      }
    } catch (error) {
      console.error('Failed to create prescription:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">สร้างใบสั่งยา</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">ชื่อผู้ป่วย</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={prescription.patientName}
              onChange={(e) => setPrescription({...prescription, patientName: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block mb-1">รหัสประจำตัวผู้ป่วย (ถ้ามี)</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={prescription.patientId}
              onChange={(e) => setPrescription({...prescription, patientId: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">การวินิจฉัย</label>
          <textarea
            className="w-full border rounded p-2"
            value={prescription.diagnosis}
            onChange={(e) => setPrescription({...prescription, diagnosis: e.target.value})}
            required
          />
        </div>

        <div className="border p-4 rounded">
          <h3 className="font-bold mb-4">เพิ่มรายการยา</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">ชื่อยา</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={currentMedication.name}
                onChange={(e) => setCurrentMedication({...currentMedication, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block mb-1">ขนาดยา</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={currentMedication.dosage}
                onChange={(e) => setCurrentMedication({...currentMedication, dosage: e.target.value})}
              />
            </div>
            <div>
              <label className="block mb-1">ความถี่</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={currentMedication.frequency}
                onChange={(e) => setCurrentMedication({...currentMedication, frequency: e.target.value})}
              />
            </div>
            <div>
              <label className="block mb-1">ระยะเวลา</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={currentMedication.duration}
                onChange={(e) => setCurrentMedication({...currentMedication, duration: e.target.value})}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={addMedication}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            เพิ่มรายการยา
          </button>
        </div>

        {prescription.medications.length > 0 && (
          <div className="border p-4 rounded">
            <h3 className="font-bold mb-4">รายการยาที่สั่ง</h3>
            <ul className="space-y-2">
              {prescription.medications.map((med, index) => (
                <li key={index} className="border p-2 rounded">
                  <p className="font-bold">{med.name}</p>
                  <p>ขนาดยา: {med.dosage}</p>
                  <p>ความถี่: {med.frequency}</p>
                  <p>ระยะเวลา: {med.duration}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <label className="block mb-1">หมายเหตุ</label>
          <textarea
            className="w-full border rounded p-2"
            value={prescription.notes}
            onChange={(e) => setPrescription({...prescription, notes: e.target.value})}
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          บันทึกใบสั่งยา
        </button>
      </form>
    </div>
  );
}