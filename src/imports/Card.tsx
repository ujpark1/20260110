import svgPaths from "./svg-mbonb3q18j";

function Container() {
  return (
    <div className="bg-[#0f172b] relative rounded-[1.67772e+07px] shrink-0 size-[64px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[64px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[20px] text-nowrap text-white tracking-[-0.4492px] whitespace-pre">DSC</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[24px] relative shrink-0 w-[112.992px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[112.992px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Dr. Sarah Chen</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14dc0c00} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4 6H1.33333V14H4V6Z" id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p342eb800} id="Vector_3" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Icon />
    </div>
  );
}

function Container2() {
  return (
    <div className="basis-0 grow h-[70px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[70px] items-start justify-center relative w-full">
        <Container1 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[70px] relative shrink-0 w-[278.43px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[70px] items-center relative w-[278.43px]">
        <Container />
        <Container2 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[70px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container3 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Author summary</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-slate-100 box-border content-stretch flex gap-[10px] items-center justify-center p-[16px] relative rounded-[10px] shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 tracking-[-0.1504px] w-[734px]">Strong in AI, Finance, and Healthcare, backed by deep domain knowledge and data-driven analytical ability to clearly interpret complex issues.</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Skills factor</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Frame />
      <Paragraph1 />
    </div>
  );
}

function Lines() {
  return (
    <div className="absolute left-1/2 size-[200px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Lines">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 200 200">
        <g id="Lines">
          <path d="M13.5 50L186.5 150" id="Vector 20" stroke="var(--stroke-0, #E0E0E0)" />
          <path d="M100 0V200" id="Vector 21" stroke="var(--stroke-0, #E0E0E0)" />
          <path d={svgPaths.p1255ca80} id="Polygon 1" stroke="var(--stroke-0, #E0E0E0)" />
          <path d={svgPaths.p4ed1c00} id="Polygon 2" stroke="var(--stroke-0, #E0E0E0)" />
          <path d={svgPaths.p11585470} id="Polygon 3" stroke="var(--stroke-0, #E0E0E0)" />
        </g>
      </svg>
    </div>
  );
}

function Chart() {
  return (
    <div className="h-[240px] relative shrink-0 w-[342px]" data-name="Chart">
      <Lines />
      <div className="absolute h-[100px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[173px]" data-name="Vector">
        <div className="absolute inset-[-0.43%_-0.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 174 101">
            <path d={svgPaths.p3b0b4f80} id="Vector" stroke="var(--stroke-0, #E0E0E0)" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[149.5px] left-[96.5px] top-[46.5px] w-[139px]" data-name="🔵 Blue">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 139 150">
          <path d={svgPaths.p4ba9c00} fill="var(--fill-0, #00C7F2)" id="ðµ Blue" opacity="0.7" />
        </svg>
      </div>
      <p className="absolute font-['Lato:Regular',sans-serif] leading-[normal] left-[calc(50%+0.5px)] not-italic text-[#2d2d2d] text-[14px] text-center text-nowrap top-[calc(50%-120px)] tracking-[0.5px] translate-x-[-50%] whitespace-pre">Research</p>
      <p className="absolute font-['Lato:Regular',sans-serif] leading-[normal] left-[calc(50%+0.5px)] not-italic text-[#2d2d2d] text-[14px] text-center text-nowrap top-[calc(50%+106px)] tracking-[0.5px] translate-x-[-50%] whitespace-pre">Information</p>
      <p className="absolute font-['Lato:Regular',sans-serif] leading-[normal] left-[calc(50%-91px)] not-italic text-[#2d2d2d] text-[14px] text-nowrap text-right top-[calc(50%+43px)] tracking-[0.5px] translate-x-[-100%] whitespace-pre">AI</p>
      <p className="absolute font-['Lato:Regular',sans-serif] leading-[normal] left-[calc(50%-91px)] not-italic text-[#2d2d2d] text-[14px] text-nowrap text-right top-[calc(50%-57px)] tracking-[0.5px] translate-x-[-100%] whitespace-pre">Healthcare</p>
      <p className="absolute font-['Lato:Regular',sans-serif] leading-[normal] left-[calc(50%+91px)] not-italic text-[#2d2d2d] text-[14px] text-nowrap top-[calc(50%+43px)] tracking-[0.5px] whitespace-pre">Technology</p>
      <p className="absolute font-['Lato:Regular',sans-serif] leading-[normal] left-[calc(50%+91px)] not-italic text-[#2d2d2d] text-[14px] text-nowrap top-[calc(50%-57px)] tracking-[0.5px] whitespace-pre">Finance</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Recent Captured Posts:</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[40px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 top-[0.5px] tracking-[-0.1504px] w-[734px]">New research shows that AI models trained with synthetic data can achieve 95% accuracy in medical diagnostics. This could revolutionize healthcare in developing countries.</p>
    </div>
  );
}

function Badge() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[103.641px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[103.641px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#90a1b9] text-[12px] text-nowrap whitespace-pre">Low Credibility</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#90a1b9] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Container">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">2025. 11. 18.</p>
      <Badge />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-slate-50 h-[94px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[94px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Paragraph3 />
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[126px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph2 />
      <Container7 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[118.781px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative w-[118.781px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">View All Posts</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-start relative shrink-0 w-full" data-name="Container">
      <Button />
    </div>
  );
}

function AuthorProfiles() {
  return (
    <div className="relative shrink-0 w-[773px]" data-name="AuthorProfiles">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[24px] items-center justify-center relative w-[773px]">
        <Container4 />
        <Container5 />
        <Chart />
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

export default function Card() {
  return (
    <div className="bg-white relative rounded-[14px] size-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pl-[25px] pr-px py-[25px] relative size-full">
          <AuthorProfiles />
        </div>
      </div>
    </div>
  );
}