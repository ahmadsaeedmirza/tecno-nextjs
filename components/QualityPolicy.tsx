import React from 'react';

const QualityPolicy = () => {
    return (
        <section className="flex justify-center items-center py-16 bg-gray-50 px-4">

            {/* Plaque Container */}
            <div className="max-w-4xl w-full bg-white shadow-2xl border border-gray-200 rounded-lg p-8 md:p-16 relative overflow-hidden">

                {/* Subtle "Bolt" Decorations to mimic the photo */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-gray-300 rounded-full shadow-inner"></div>
                <div className="absolute top-4 right-4 w-3 h-3 bg-gray-300 rounded-full shadow-inner"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-gray-300 rounded-full shadow-inner"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-gray-300 rounded-full shadow-inner"></div>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <img
                        src="/tecno-logo.webp"
                        alt="TECNO Instruments"
                        className="h-20 w-auto"
                    />

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight leading-relaxed" dir="rtl">
                        کوالٹی پالیسی
                    </h2>
                </div>

                {/* Urdu Content */}
                <div className="text-right mb-12" dir="rtl">
                    <p className="text-xl md:text-2xl leading-[1.8] text-gray-700 font-medium">
                        ہم اس بات پر یقین رکھتے ہیں کہ گاہک کو معیاری اور صرف وہی مصنوعات فراہم کی جائیں جو محفوظ، فائدہ مند اور قابل اعتبار ہوں۔ ہم ہمیشہ اس امر کیلئے کوشاں ہیں کہ ہم اپنے ملازمین کو کام کی ہر سطح پر شامل کریں، ان کی فلاح و بہبود کا خیال رکھیں اور کاروبار کی کارکردگی بہتر بنائیں۔
                    </p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-200 mb-12"></div>

                {/* English Content */}
                <div className="text-left">
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 font-outfit">Quality Policy</h3>
                    <p className="text-lg md:text-xl leading-relaxed text-gray-700 font-outfit">
                        Tecno Instruments (Pvt.) Ltd. endeavors to meet or exceed customers requirements.
                        We believe in providing our customer with products that are safe, effective, and
                        reliable over their projected life span. We are committed to employee involvement,
                        employee welfare, continuous improvement and improved business performance goals.
                    </p>
                </div>

                {/* Footer / Signature */}
                <div className="mt-12 text-right border-t border-gray-100 pt-6">
                    <p className="text-xl font-bold text-gray-900 uppercase tracking-wide">Shuaib Bhatti</p>
                    <p className="text-[#A1746B] font-medium text-sm tracking-widest uppercase">Managing Director</p>
                </div>
            </div>
        </section>
    );
};

export default QualityPolicy;