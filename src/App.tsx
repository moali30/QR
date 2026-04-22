/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { PlusCircle, Printer, FileText, Settings, Upload, X } from 'lucide-react';
import { fileToBase64 } from '@/src/lib/utils';
import { FacultyMember } from '@/src/types';
import { FormItem } from '@/src/components/FormItem';
import { PreviewGrid } from '@/src/components/PreviewGrid';
import { PrintableReport } from '@/src/components/PrintableReport';

export default function App() {
  const [members, setMembers] = useState<FacultyMember[]>([]);
  const [roomName, setRoomName] = useState<string>('قاعة المحاضرات (101)');
  const [reportSubtitle, setReportSubtitle] = useState<string>('الجدول الأكاديمي لعرض الساعات المكتبية والرموز التعريفية');
  const [universityLogo, setUniversityLogo] = useState<string>('');
  const [collegeLogo, setCollegeLogo] = useState<string>('');
  
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: reportRef,
    documentTitle: 'تقرير_QR_أعضاء_التدريس',
  });

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const base64 = await fileToBase64(file);
      setter(base64);
    } else if (file) {
      alert('يجب أن يكون الملف بصيغة JPG أو PNG');
    }
  };

  const addMember = () => {
    const newMember: FacultyMember = {
      id: crypto.randomUUID(),
      name: '',
      qrImage: '',
      officeHours: '',
    };
    setMembers([newMember, ...members]);
  };

  const updateMember = (id: string, updates: Partial<FacultyMember>) => {
    setMembers(members.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const removeMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const isPrintDisabled = members.length === 0 || members.some(m => !m.name.trim() || !m.qrImage);

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans border-t-4 border-indigo-700" dir="rtl">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm border-b shrink-0">
        <div className="flex items-center space-x-reverse space-x-4">
          <div className="w-10 h-10 bg-indigo-700 rounded flex items-center justify-center text-white font-bold text-xl">
            QR
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">نظام إدارة تقارير الرموز الأكاديمية</h1>
            <p className="text-xs text-slate-500 uppercase tracking-widest">عمادة شؤون أعضاء هيئة التدريس</p>
          </div>
        </div>
        <div className="flex items-center space-x-reverse space-x-4">
          <button
            onClick={() => handlePrint()}
            disabled={isPrintDisabled}
            className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg font-bold shadow shadow-indigo-200 transition-colors"
          >
            <Printer size={18} />
            <span>توليد تقرير PDF للطباعة</span>
          </button>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row flex-1 overflow-hidden w-full">
        {/* Sidebar: Input Form */}
        <aside className="w-full lg:w-1/3 bg-white border-l p-6 flex flex-col space-y-8 overflow-y-auto shrink-0">
          
          {/* Settings Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-800 pb-2 border-b border-slate-100">
               <Settings size={20} className="text-indigo-600" />
               <h2 className="text-lg font-bold">إعدادات التقرير</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">اسم القاعة / المعمل (يظهر كعنوان رئيسي كبير)</label>
                  <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full px-4 py-2 text-base font-bold border rounded border-slate-300 bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all text-center"
                    placeholder="مثال: قاعة 101"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">العنوان الفرعي / الوصف</label>
                  <input
                    type="text"
                    value={reportSubtitle}
                    onChange={(e) => setReportSubtitle(e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded border-slate-200 bg-white focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="مثال: تقرير الساعات المكتبية والرموز التعريفية"
                  />
                </div>
              </div>

              {/* University Logo */}
              <div className="bg-slate-50 p-3 rounded border border-slate-200 flex flex-col justify-between">
                <label className="block text-xs font-bold text-slate-600 mb-2">شعار الجامعة (يمين الرأس)</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer flex flex-1 items-center justify-center text-xs font-bold bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded hover:bg-slate-100 hover:text-indigo-600 transition-colors">
                    <Upload size={14} className="ml-1" /> رفع شعار
                    <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={(e) => handleLogoUpload(e, setUniversityLogo)} />
                  </label>
                  {universityLogo && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white border border-slate-200 rounded p-0.5 shrink-0"><img src={universityLogo} alt="Logo" className="w-full h-full object-contain" /></div>
                      <button onClick={() => setUniversityLogo('')} className="text-red-500 hover:text-red-700 shrink-0"><X size={16} /></button>
                    </div>
                  )}
                </div>
              </div>

              {/* College Logo */}
              <div className="bg-slate-50 p-3 rounded border border-slate-200 flex flex-col justify-between">
                <label className="block text-xs font-bold text-slate-600 mb-2">شعار الكلية (يسار الرأس)</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer flex flex-1 items-center justify-center text-xs font-bold bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded hover:bg-slate-100 hover:text-indigo-600 transition-colors">
                    <Upload size={14} className="ml-1" /> رفع شعار
                    <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={(e) => handleLogoUpload(e, setCollegeLogo)} />
                  </label>
                  {collegeLogo && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white border border-slate-200 rounded p-0.5 shrink-0"><img src={collegeLogo} alt="Logo" className="w-full h-full object-contain" /></div>
                      <button onClick={() => setCollegeLogo('')} className="text-red-500 hover:text-red-700 shrink-0"><X size={16} /></button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="flex flex-col space-y-4 flex-1">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-lg font-bold flex items-center">
                <FileText className="w-5 h-5 ml-2 text-indigo-600" />
                أعضاء الهيئة
              </h2>
              <button
                onClick={addMember}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded border border-indigo-100 hover:bg-indigo-100 flex items-center gap-1 transition-colors"
              >
                <PlusCircle size={14} />
                <span>إضافة عنصر</span>
              </button>
            </div>

            <div className="space-y-4">
              {members.length === 0 ? (
                <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                  <p className="text-xs text-slate-500 mb-4 font-bold">تم إخلاء القائمة</p>
                  <button
                    onClick={addMember}
                    className="px-4 py-2 bg-white text-indigo-600 text-xs font-bold border border-indigo-200 hover:border-indigo-400 rounded transition-colors mx-auto inline-block"
                  >
                    + إضافة دكتور أو معيد
                  </button>
                </div>
              ) : (
                members.map(member => (
                  <FormItem 
                    key={member.id} 
                    member={member} 
                    onUpdate={updateMember} 
                    onRemove={removeMember} 
                  />
                ))
              )}
              
              {members.some(m => !m.name.trim() || !m.qrImage) && members.length > 0 && (
                 <div className="p-3 bg-red-50 text-red-700 rounded border border-red-200 text-xs font-bold relative">
                   <div className="absolute -right-1 top-2 bottom-2 w-1 bg-red-500 rounded-full"></div>
                   يجب إدخال الاسم ورفع الصورة لكل عنصر لتتمكن من إنشاء التقرير.
                 </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main: Print Preview Screen */}
        <section className="flex-1 p-6 md:p-10 flex flex-col items-center overflow-y-auto bg-slate-50">
          <div className="w-full max-w-4xl mb-4 flex justify-between items-end shrink-0">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">معاينة مباشرة (Live Preview)</h3>
              <p className="text-xs text-slate-500">سيتم تصدير التقرير بنفس هذا التنسيق</p>
            </div>
            <div className="flex space-x-reverse space-x-2 text-xs">
              <span className="bg-white px-2 py-1 rounded shadow-sm border border-slate-200 font-bold text-slate-600">ورق: A4</span>
            </div>
          </div>

          <div className="bg-white w-full max-w-4xl shadow-xl border border-slate-200 flex flex-col p-8 min-h-[700px] shrink-0">
             <PreviewGrid members={members} roomName={roomName} reportSubtitle={reportSubtitle} universityLogo={universityLogo} collegeLogo={collegeLogo} />
          </div>
        </section>
      </main>

      {/* Hidden Printable Component */}
      <PrintableReport ref={reportRef} members={members} roomName={roomName} reportSubtitle={reportSubtitle} universityLogo={universityLogo} collegeLogo={collegeLogo} />
    </div>
  );
}
