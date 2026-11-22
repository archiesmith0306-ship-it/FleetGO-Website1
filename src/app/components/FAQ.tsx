import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import SectionLabel from './SectionLabel';

const FAQS = [
  {
    q: 'How fast can we get started?',
    a: 'Most fleets are live within a few business days. We need admin access to your telematics provider (Samsara or Motive) and a list of units — we handle the rest of the setup.',
  },
  {
    q: 'Do you work with owner-operators and small fleets?',
    a: 'Yes. The core plan starts at 1–10 trucks at $100 per truck per month. There is a monthly minimum equal to 10 trucks, so very small fleets are quoted against that.',
  },
  {
    q: 'What does the Fuel Saving fee actually cost me?',
    a: 'Twenty-five percent of the savings we verify against your matched fill-ups. If we do not save you money in a month, there is no fee for that month. 24/7 monitoring is included.',
  },
  {
    q: 'Do I have to replace my current telematics hardware?',
    a: 'No. We integrate with your existing Samsara or Motive account. There is no rip-and-replace and no new hardware to buy.',
  },
  {
    q: 'What is not included in the price?',
    a: 'Repair and parts costs, towing, and any third-party vendor fees are billed to you directly. Our fee covers the monitoring, coordination, reporting and case management.',
  },
  {
    q: 'How am I billed?',
    a: 'Monthly in arrears, based on active days per truck and capped at the monthly rate. An active day is any day a truck has a trip or recorded movement. Invoices are Net 10 or Net 30.',
  },
  {
    q: 'Can I cancel?',
    a: 'The standard term is six months with cancellation at any time on 30 days written notice. Rates are fixed for the term.',
  },
  {
    q: 'What do I actually receive each week?',
    a: 'A work order whenever a maintenance case closes, plus a detailed maintenance expense statement every week covering all activity on your fleet.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12">
          <div>
            <SectionLabel id="faq" className="mb-5" />
            <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(1.9rem,4vw,3rem)] text-[#0b1829] mb-5">
              Straight answers,{' '}
              <span className="text-[#c8970d]">before you ask.</span>
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Still unsure about something? Call us — a person answers, any hour.
            </p>
          </div>

          <div className="border-t border-slate-200">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} className="border-b border-slate-200">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-5 py-5 text-left group"
                  >
                    <span className="flex gap-4">
                      <span className="font-mono text-xs text-slate-400 pt-1">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display font-bold text-lg text-[#0b1829] group-hover:text-[#c8970d] transition-colors">
                        {item.q}
                      </span>
                    </span>
                    <span className="flex-shrink-0 mt-1 text-[#c8970d]">
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="text-slate-600 leading-relaxed pb-5 pl-10 pr-10">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Structured data for rich results and AI search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
}
