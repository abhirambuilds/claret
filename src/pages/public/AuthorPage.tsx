import { User, GraduationCap, Award, BookOpen } from 'lucide-react';
import { useSiteSettings } from '../../hooks/useSanity';

export default function AuthorPage() {
  const { settings } = useSiteSettings();

  const editor = {
    name: 'Dr. D. Prem Anand',
    qualification: 'M.Sc., M.Phil., Ph.D.',
    designation: 'Associate Professor of Physics',
    institution: "St. Xavier's College (Autonomous), Palayamkottai - 627002"
  };

  const authors = [
    {
      name: 'M. Sekar',
      qualification: 'M.Sc., B.Ed.',
      designation: 'PG Assistant in Physics',
      institution: 'T.E.L.C Kabis Hr Sec School, Pandur, Tiruvallur District - 631 203'
    },
    {
      name: 'C. Jayaseelan',
      qualification: 'M.Sc., B.Ed.',
      designation: 'PG Assistant in Physics',
      institution: 'GHSS Thatchurwest Arani, Tiruvannamalai District - 632 326'
    },
    {
      name: 'C. Hendri',
      qualification: 'M.Sc., B.Ed., M.Phil.',
      designation: 'PG Assistant in Physics',
      institution: 'Govt HSS Kunnagampundi, Thiruvannamalai District - 606 603'
    },
    {
      name: 'Dr. S. Selvakumar',
      qualification: 'M.Sc., M.Phil., Ph.D.',
      designation: 'Associate Professor of Physics',
      institution: 'Government Arts College (Autonomous), Nandanam, Chennai - 600 035'
    },
    {
      name: 'Dr. M. Victor Antony Raj',
      qualification: 'M.Sc., M.Phil., Ph.D.',
      designation: 'Assistant Professor of Physics',
      institution: 'Loyola College (Autonomous), Chennai - 600 034'
    },
    {
      name: 'Dr. R.S. Daries Bella',
      qualification: 'M.Sc., M.Phil., Ph.D.',
      designation: 'Eminent Physicist & Academician',
      institution: 'Physics Department'
    },
    {
      name: 'Dr. M. Ambrose Rajkumar',
      qualification: 'M.Sc., B.Ed., Ph.D.',
      designation: 'Assistant Professor of Physics',
      institution: 'Kristu Jayanti Deemed to be University, Kothanur, Bengaluru - 560 077'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1D1D1F] mb-4 font-display">
            Our Editors & Authors
          </h1>
          <p className="text-[#6E6E73] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            At {settings.publicationName || 'Claret Publications'}, our books are conceptualized and written by distinguished academicians and senior faculty members with decades of classroom experience.
          </p>
        </div>

        {/* Editor Section */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-5 bg-[#007AFF] rounded-full" />
            <h2 className="text-xl font-extrabold text-[#1D1D1F] font-display">Editor</h2>
          </div>
          
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0A2540] flex-shrink-0">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-lg font-bold text-[#1D1D1F]">{editor.name}</h3>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {editor.qualification}
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#6E6E73] mt-1">{editor.designation}</p>
                <p className="text-xs text-[#6E6E73] mt-2 bg-gray-50 p-3 rounded-xl border border-gray-100 inline-block font-medium">
                  {editor.institution}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Authors Section */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-5 bg-[#007AFF] rounded-full" />
            <h2 className="text-xl font-extrabold text-[#1D1D1F] font-display">Contributing Authors</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {authors.map((author, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
                    <User className="w-6 h-6 text-[#0A2540]" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-1.5">
                      <h4 className="text-base font-bold text-[#1D1D1F]">{author.name}</h4>
                      <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {author.qualification}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#6E6E73] mt-0.5">{author.designation}</p>
                    <p className="text-[11px] text-[#6E6E73] mt-2 font-medium">
                      {author.institution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
