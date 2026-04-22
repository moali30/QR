import React from 'react';
import { FacultyMember } from '@/src/types';

interface PreviewGridProps {
  members: FacultyMember[];
  roomName?: string;
  reportSubtitle?: string;
  universityLogo?: string;
  collegeLogo?: string;
}

export function PreviewGrid({ members, roomName, reportSubtitle, universityLogo, collegeLogo }: PreviewGridProps) {
  const count = members.length;

  const getLayoutClasses = (count: number) => {
    if (count === 1) return 'flex flex-col items-center justify-center mt-12 mb-12';
    if (count === 2) return 'grid grid-cols-2 gap-20 mt-16 max-w-4xl mx-auto';
    if (count <= 4) return 'grid grid-cols-2 gap-y-20 gap-x-16 mt-12 max-w-4xl mx-auto px-4';
    if (count <= 6) return 'grid grid-cols-3 gap-y-16 gap-x-12 mt-10';
    return 'grid grid-cols-3 gap-y-14 gap-x-8 mt-8';
  };

  const getQRSizeClasses = (count: number) => {
    if (count === 1) return 'w-72 h-72 lg:w-80 lg:h-80 border-[10px] rounded-[2rem] p-5 shadow-2xl';
    if (count === 2) return 'w-56 h-56 lg:w-64 lg:h-64 border-8 rounded-3xl p-4 shadow-xl';
    if (count <= 4) return 'w-48 h-48 border-[6px] rounded-2xl p-3 shadow-lg';
    return 'w-36 h-36 lg:w-40 lg:h-40 border-4 rounded-xl p-2 shadow-md';
  };
  
  const getTextSizeClasses = (count: number) => {
    if (count === 1) return 'text-xl lg:text-3xl min-w-[280px] lg:min-w-[400px] px-8 py-4 lg:py-5 rounded-2xl';
    if (count === 2) return 'text-lg lg:text-xl min-w-[220px] lg:min-w-[280px] px-6 py-3 rounded-xl';
    if (count <= 4) return 'text-base lg:text-lg min-w-[180px] lg:min-w-[220px] px-5 py-2.5 rounded-xl';
    return 'text-xs lg:text-sm min-w-[140px] lg:min-w-[180px] px-3 py-2 rounded-lg';
  };

  const getTriangleClasses = (count: number) => {
    if (count === 1) return 'border-l-[16px] border-r-[16px] border-b-[16px] -top-3 lg:border-l-[20px] lg:border-r-[20px] lg:border-b-[20px] lg:-top-4';
    if (count <= 4) return 'border-l-[12px] border-r-[12px] border-b-[12px] -top-2 lg:border-l-[16px] lg:border-r-[16px] lg:border-b-[16px] lg:-top-3';
    return 'border-l-[10px] border-r-[10px] border-b-[10px] -top-1.5 lg:border-l-[12px] lg:border-r-[12px] lg:border-b-[12px] lg:-top-2';
  };

  return (
    <>
      <div className="absolute inset-x-0 top-0 h-3 bg-indigo-700 z-10"></div>
      <div className="absolute inset-x-0 bottom-0 h-3 bg-indigo-700 z-10"></div>
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#4f46e5 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center pb-6 mb-6 border-b-2 border-indigo-100">
          <div className="flex items-center gap-4 w-1/4">
            {universityLogo ? (
              <img src={universityLogo} alt="University Logo" className="max-w-[70px] max-h-[70px] object-contain" />
            ) : (
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-xl flex items-center justify-center text-slate-400 font-bold text-[10px] lg:text-xs text-center p-1 border-2 border-dashed border-slate-200">شعار الجامعة</div>
            )}
          </div>
          <div className="flex-1 text-center flex flex-col items-center justify-center">
            <div className="inline-block bg-slate-50 px-6 py-2 lg:py-3 lg:px-10 rounded-2xl border-2 border-slate-200 shadow-sm mb-2 lg:mb-3">
              <h4 className="text-2xl lg:text-4xl font-black text-slate-900 tracking-wide">{roomName || 'قاعة 101'}</h4>
            </div>
            <p className="text-[10px] lg:text-sm font-bold text-indigo-700 uppercase tracking-widest">{reportSubtitle || 'الجدول الأكاديمي لعرض الساعات المكتبية والرموز التعريفية'}</p>
          </div>
          <div className="flex justify-end items-center gap-4 w-1/4">
            {collegeLogo ? (
              <img src={collegeLogo} alt="College Logo" className="max-w-[70px] max-h-[70px] object-contain" />
            ) : (
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-xl flex items-center justify-center text-slate-400 font-bold text-[10px] lg:text-xs text-center p-1 border-2 border-dashed border-slate-200">شعار الكلية</div>
            )}
          </div>
        </div>

        {/* Content */}
        {members.length === 0 ? (
          <div className="text-center py-20 flex-1 flex flex-col items-center justify-center">
            <p className="text-slate-400 text-sm font-bold">المعاينة فارغة (قم بإضافة بيانات لرؤية التخطيط)</p>
          </div>
        ) : (
          <div className={`${getLayoutClasses(count)} flex-1 w-full`}>
            {members.map((member, index) => (
              <div key={member.id} className="flex flex-col items-center group cursor-default">
                
                {/* QR Box */}
                <div className={`bg-white border-indigo-600 flex items-center justify-center relative transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_25px_-5px_rgba(79,70,229,0.3)] ${getQRSizeClasses(count)}`}>
                  <div className="absolute inset-1 border-2 border-indigo-50 rounded-xl pointer-events-none transition-colors duration-300 group-hover:border-indigo-100"></div>
                  
                  {member.qrImage ? (
                    <img src={member.qrImage} alt="QR" className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full border-4 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-indigo-50 group-hover:border-indigo-200">
                      <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-500">لا توجد صورة</span>
                    </div>
                  )}
                </div>

                {/* Banner / Label */}
                <div className="relative mt-4 flex flex-col items-center">
                  <div className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-transparent border-r-transparent border-b-indigo-700 transition-colors duration-300 group-hover:border-b-indigo-800 ${getTriangleClasses(count)}`}></div>
                  <div className={`bg-indigo-700 text-white flex items-center justify-center font-black text-center shadow-md relative z-10 transition-colors duration-300 group-hover:bg-indigo-800 truncate ${getTextSizeClasses(count)}`} style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {member.name || 'عضو غير مسجل'}
                  </div>
                  {member.officeHours && (
                    <div className="mt-2 text-center bg-indigo-50 border border-indigo-100 text-indigo-800 px-4 py-1.5 rounded-lg shadow-sm transition-all duration-300 group-hover:bg-indigo-100 max-w-[90%]">
                      <p className="text-[10px] font-bold text-indigo-500 mb-0.5">الساعات المكتبية</p>
                      <p className="text-xs font-semibold whitespace-pre-wrap leading-relaxed">
                        {member.officeHours}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t-2 border-indigo-100 flex justify-between items-center text-[10px] lg:text-xs text-slate-500 font-bold shrink-0">
          <p>نظام إدارة التقارير الأكاديمية © {new Date().getFullYear()}</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 block"></span>
            صفحة رسمية وموثقة
          </p>
        </div>
      </div>
    </>
  );
}
