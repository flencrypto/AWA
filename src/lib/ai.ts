import type { AIMessage, TherapyMessage } from '@/types'

export const AI_MODES = [
  { id: 'explain_simple', label: 'Explain it simply', icon: '🔍', description: 'Plain English explanations' },
  { id: 'technical', label: 'Technical detail', icon: '⚙️', description: 'Full technical breakdown' },
  { id: 'fault_finding', label: 'Fault-finding assistant', icon: '🔧', description: 'Diagnose problems' },
  { id: 'cert_draft', label: 'Certificate drafting help', icon: '📋', description: 'Assist with cert wording' },
  { id: 'materials', label: 'Materials list builder', icon: '📦', description: 'Build a materials list' },
  { id: 'customer_msg', label: 'Customer message rewriter', icon: '✉️', description: 'Professional comms' },
  { id: 'scope_quote', label: 'Scope / quote helper', icon: '💷', description: 'Scope and price jobs' },
  { id: 'compliance', label: 'UK compliance helper', icon: '🏛️', description: 'UK regs and standards' },
]

const MOCK_RESPONSES: Record<string, string[]> = {
  explain_simple: [
    "In simple terms: RCD protection works like a safety guard on your electrics. It watches the current going in and coming back — if there's a difference (even tiny), it trips the circuit instantly to protect you from a shock. Think of it like a smoke alarm, but for electricity.",
    "A consumer unit (what most folks call a fuse box) is basically the brain of your electrical system. It controls where power goes throughout the building and protects each circuit with its own breaker.",
  ],
  technical: [
    "Per BS 7671:2018+A2:2022, all socket outlets in domestic premises require 30mA RCD protection under Regulation 411.3.3. Additional protection is required in bathrooms (Zone 1/2) under 701.411.3.3. Ensure discrimination between Type B and Type A devices where mixed load types are present.",
    "The 18th Edition Amendment 2 introduced significant changes to SPD requirements. Regulation 443.4 now mandates SPD installation where loss of supply would have serious consequences. Verify the AQ criteria before proceeding.",
  ],
  fault_finding: [
    "For an RCD nuisance tripping issue: 1) First, turn off all final circuits and reset RCD. If it holds, reconnect circuits one at a time. 2) Identify the faulty circuit. 3) Check for earth leakage — likely culprits: shower elements, washing machines, or any appliance with heating elements. 4) Test insulation resistance (IR test) on suspect circuits. 5) Check for moisture ingress, especially in outdoor sockets or kitchens.",
  ],
  cert_draft: [
    "For your EIC remarks section, consider: 'Installation carried out in accordance with BS 7671:2018+A2:2022. New radial circuit for [description]. All work tested and inspected prior to energisation. RCD protection provided to all socket outlets per Reg 411.3.3.' Remember: I can help draft wording, but you must verify all technical details and sign as the responsible person.",
  ],
  materials: [
    "For a standard 3-bed house rewire, you'll typically need:\n• 100m 2.5mm² T&E (ring main)\n• 50m 1.5mm² T&E (lighting)\n• 20m 6mm² T&E (cooker)\n• 10m 10mm² T&E (shower)\n• 18th Edition consumer unit (20-way)\n• 20x double sockets\n• 15x single sockets\n• 10x light switches\nAlways add 15% wastage factor.",
  ],
  customer_msg: [
    "Here's a professional version: 'Thank you for getting in touch. I've reviewed your requirements and can confirm I'm able to carry out this work. I'll prepare a detailed quotation and send it across within 24 hours. Should you have any questions in the meantime, please don't hesitate to contact me.'\n\nWould you like me to adjust the tone or add specific details?",
  ],
  scope_quote: [
    "For a bathroom circuit replacement job:\n\n**Scope of works:**\n1. Isolate and make safe existing bathroom circuit\n2. Install new 6mm² cable from CU to shower position\n3. Fit 45A double-pole isolator switch outside bathroom\n4. Connect new shower unit\n5. Full inspection and test\n6. Issue EIC on completion\n\n**Suggested pricing:**\n• Labour: 4hrs @ your rate\n• Materials: ~£45-65",
  ],
  compliance: [
    "Under the Building Regulations Part P (England & Wales), most fixed electrical work in dwellings must be carried out by a competent person registered with an approved scheme (NICEIC, NAPIT, etc.) OR notified to Building Control. Scotland follows Technical Handbook Domestic Section 4.5.\n\n**Key point:** This is AI guidance only — always verify with the relevant authority and your scheme's technical helpline for your specific situation.",
  ],
}

const THERAPY_RESPONSES = [
  "I hear you. It sounds like you're carrying a lot right now. Being a tradesperson comes with unique pressures — the physical demands, the responsibility, the business stress on top of the actual work. That's a heavy load.\n\nCan you tell me a bit more about what's feeling heaviest for you today?",
  "That sounds really tough. It's completely understandable to feel overwhelmed when you're juggling jobs, clients, finances, and everything else. You don't have to hold it all together without showing any cracks.\n\nYou don't have to do that here. What would feel most helpful right now — to talk through what's happening, or to try one of our reset exercises?",
  "Thank you for sharing that with me. It takes real strength to acknowledge when things are difficult.\n\nSometimes when we're under pressure, our body holds tension we don't even notice. Would you like to try a quick 2-minute breathing exercise to help ground yourself before we continue talking?",
  "I'm really glad you reached out today. What you're describing — that constant background stress, the feeling that you can never fully switch off — is something many tradespeople experience. You're not alone in this.\n\nTake your time. This is your space.",
]

let aiMessageCounter = 0
let therapyMessageCounter = 0

export async function sendTradeAIMessage(
  _message: string,
  mode: string,
  _history: AIMessage[]
): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600))
  const responses = MOCK_RESPONSES[mode] || MOCK_RESPONSES.explain_simple
  const response = responses[aiMessageCounter % responses.length]
  aiMessageCounter++
  return response + '\n\n*⚠️ AI guidance only — not a substitute for certified professional advice. Always verify with applicable standards and your registration body.*'
}

export async function sendTherapyMessage(
  _message: string,
  _history: TherapyMessage[]
): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 800))
  const response = THERAPY_RESPONSES[therapyMessageCounter % THERAPY_RESPONSES.length]
  therapyMessageCounter++
  return response
}
