import React, { forwardRef } from 'react';
import { FacultyMember } from '@/src/types';

interface PrintableReportProps {
  members: FacultyMember[];
  roomName: string;
  reportSubtitle?: string;
  universityLogo?: string;
  collegeLogo?: string;
}

export const PrintableReport = forwardRef<HTMLDivElement, PrintableReportProps>(({ members, roomName, reportSubtitle, universityLogo, collegeLogo }, ref) => {
  const count = members.length;

  const getLayoutClasses = (count: number) => {
    if (count === 1) return 'flex flex-col items-center justify-center mt-20 mb-20';
    if (count === 2) return 'grid grid-cols-2 gap-20 mt-24 max-w-4xl mx-auto';
    if (count <= 4) return 'grid grid-cols-2 gap-y-24 gap-x-16 mt-16 max-w-4xl mx-auto px-8';
    if (count <= 6) return 'grid grid-cols-3 gap-y-16 gap-x-10 mt-12';
    return 'grid grid-cols-3 gap-y-12 gap-x-8 mt-10';
  };

  const getQRSizeClasses = (count: number) => {
    if (count === 1) return 'w-80 h-80 border-[12px] rounded-[2rem] p-6 shadow-2xl';
    if (count === 2) return 'w-72 h-72 border-[10px] rounded-[1.5rem] p-5 shadow-xl';
    if (count <= 4) return 'w-56 h-56 border-8 rounded-2xl p-4 shadow-lg';
    return 'w-44 h-44 border-[6px] rounded-2xl p-3 shadow-md';
  };
  
  const getTextSizeClasses = (count: number) => {
    if (count === 1) return 'text-3xl min-w-[400px] px-10 py-5 rounded-2xl';
    if (count === 2) return 'text-2xl min-w-[320px] px-8 py-4 rounded-xl';
    if (count <= 4) return 'text-xl min-w-[260px] px-6 py-3 rounded-xl';
    return 'text-sm min-w-[200px] px-4 py-2.5 rounded-lg';
  };

  const getTriangleClasses = (count: number) => {
    if (count === 1) return 'border-l-[20px] border-r-[20px] border-b-[20px] -top-4';
    if (count <= 4) return 'border-l-[16px] border-r-[16px] border-b-[16px] -top-3';
    return 'border-l-[12px] border-r-[12px] border-b-[12px] -top-2';
  };

  return (
    <div className="hidden print:block">
      {/* Strict A4 Setup */}
      <div ref={ref} className="bg-white text-slate-900 font-sans relative overflow-hidden" style={{ width: '210mm', minHeight: '297mm', padding: '12mm' }} dir="rtl">
        
        {/* Academic Watermark/Pattern Background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#4f46e5 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}></div>
        <div className="absolute inset-x-0 top-0 h-4 bg-indigo-700 z-10"></div>
        <div className="absolute inset-x-0 bottom-0 h-4 bg-indigo-700 z-10"></div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center pb-8 mb-8 border-b-2 border-indigo-100">
            <div className="w-1/4 flex justify-start">
               {universityLogo ? (
                 <img src={universityLogo} alt="University Logo" className="h-24 w-auto max-w-[140px] object-contain" />
               ) : (
                 <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-bold text-[10px] text-center p-2 border-2 border-dashed border-slate-200">شعار الجامعة</div>
               )}
            </div>
            
            <div className="flex-1 text-center px-4 flex flex-col items-center justify-center">
              <div className="inline-block bg-slate-50 px-10 py-3 rounded-2xl border-2 border-slate-200 shadow-sm mb-3">
                <h4 className="text-4xl font-black text-slate-900 tracking-wide">{roomName || 'قاعة 101'}</h4>
              </div>
              <p className="text-sm font-bold text-indigo-700 uppercase tracking-widest">{reportSubtitle || 'الجدول الأكاديمي لعرض الساعات المكتبية والرموز التعريفية'}</p>
            </div>

            <div className="w-1/4 flex justify-end items-center gap-6">
               {collegeLogo ? (
                 <img src={collegeLogo} alt="College Logo" className="h-24 w-auto max-w-[140px] object-contain" />
               ) : (
                 <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-bold text-[10px] text-center p-2 border-2 border-dashed border-slate-200">شعار الكلية</div>
               )}
            </div>
          </div>

          {/* Dynamic Grid / Single centered QR */}
          <div className={`${getLayoutClasses(count)} flex-1`}>
            {members.map((member, index) => (
               <div key={member.id} className="flex flex-col items-center print-page-break" style={{ pageBreakInside: 'avoid' }}>
                  
                  {/* QR Box with Thick Colored Border */}
                  <div className={`bg-white border-indigo-600 flex items-center justify-center relative ${getQRSizeClasses(count)}`}>
                    {/* Inner elegant line */}
                    <div className="absolute inset-1 border-2 border-indigo-50 rounded-xl pointer-events-none"></div>
                    
                    {member.qrImage ? (
                      <img src={member.qrImage} alt={`QR Code ${index+1}`} className="w-full h-full object-contain mix-blend-multiply" />
                    ) : (
                      <div className="w-full h-full border-4 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center rounded-xl">
                        <span className="text-slate-400 font-bold">فارغ</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Speech Bubble / Label */}
                  <div className="relative mt-4 flex flex-col items-center">
                    {/* Triangle pointer starting from box to banner */}
                    <div className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-transparent border-r-transparent border-b-indigo-700 ${getTriangleClasses(count)}`}></div>
                    
                    {/* Text Banner */}
                    <div className={`bg-indigo-700 text-white flex items-center justify-center font-black text-center shadow-md relative z-10 ${getTextSizeClasses(count)}`} style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {member.name || 'عضو غير مسجل'}
                    </div>
                    {member.officeHours && (
                      <div className="mt-2 text-center bg-indigo-50 border border-indigo-100 text-indigo-800 px-4 py-1.5 rounded-xl shadow-sm max-w-[90%]">
                        <p className="text-[10px] font-bold text-indigo-500 mb-0.5">الساعات المكتبية</p>
                        <p className="text-sm font-semibold whitespace-pre-wrap leading-relaxed">
                          {member.officeHours}
                        </p>
                      </div>
                    )}
                  </div>
               </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="mt-16 pt-6 border-t-2 border-indigo-100 flex justify-between items-center text-sm text-slate-500 font-bold shrink-0">
             <p>نظام إدارة التقارير الأكاديمية © {new Date().getFullYear()}</p>
             <p className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-indigo-500 block"></span>
               صفحة رسمية وموثقة
             </p>
          </div>
        </div>
      </div>
    </div>
  );
});

PrintableReport.displayName = 'PrintableReport';
