import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { fileToBase64 } from '@/src/lib/utils';
import { FacultyMember } from '@/src/types';

interface FormItemProps {
  member: FacultyMember;
  onUpdate: (id: string, updates: Partial<FacultyMember>) => void;
  onRemove: (id: string) => void;
}

export function FormItem({ member, onUpdate, onRemove }: FormItemProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const base64 = await fileToBase64(file);
        onUpdate(member.id, { qrImage: base64 });
      } else {
        alert('يجب أن يكون الملف بصيغة JPG أو PNG');
      }
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-slate-50 border-slate-200 relative transition-all hover:border-indigo-300">
      <div className="absolute -right-2 top-4 w-1 h-12 bg-indigo-500 rounded-full"></div>
      
      <div className="flex flex-col space-y-3">
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1">اسم الدكتور / المعيد</label>
          <input
            type="text"
            value={member.name}
            onChange={(e) => onUpdate(member.id, { name: e.target.value })}
            placeholder="أدخل الاسم الرباعي هنا..."
            className="w-full px-3 py-2 text-sm border rounded border-slate-200 bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
          />
        </div>

        <div>
           <label className="block text-xs font-bold text-slate-500 mb-1">الساعات المكتبية (اختياري)</label>
           <textarea
             value={member.officeHours || ''}
             onChange={(e) => onUpdate(member.id, { officeHours: e.target.value })}
             placeholder="مثال: الأحد والثلاثاء: 10 ص - 12 م"
             rows={2}
             className="w-full px-3 py-2 text-sm border rounded border-slate-200 bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
           />
        </div>

        <div>
           <div className="flex flex-col gap-2">
              <input 
                type="file" 
                accept="image/png, image/jpeg" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              
              {member.qrImage ? (
                <div className="flex items-center justify-between bg-white border border-slate-200 p-2 rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded shrink-0 bg-slate-50 flex items-center justify-center p-0.5 border border-slate-100">
                      <img src={member.qrImage} alt="QR Preview" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">تم رفع رمز QR بنجاح</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[10px] text-indigo-600 font-bold hover:underline transition-all"
                    >
                      تغيير
                    </button>
                    <span className="text-slate-300">|</span>
                    <button 
                      type="button"
                      onClick={() => onRemove(member.id)}
                      className="text-[10px] text-red-600 font-bold hover:underline transition-all"
                    >
                      حذف العنصر
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-2.5 border-2 border-dashed border-slate-300 rounded text-slate-400 text-xs font-bold hover:border-indigo-400 hover:text-indigo-600 transition-colors bg-white"
                  >
                    + رفع صورة QR (JPG/PNG)
                  </button>
                  <button 
                    type="button"
                    onClick={() => onRemove(member.id)}
                    className="mr-2 p-2 text-slate-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                    title="حذف العنصر"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
