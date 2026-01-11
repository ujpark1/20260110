import svgPaths from "./svg-gfzgr19iih";

function CardTitle() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="CardTitle">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Tasks</p>
    </div>
  );
}

function CardDescription() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="CardDescription">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Manage posts</p>
    </div>
  );
}

function Container() {
  return (
    <div className="basis-0 grow h-[40px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[40px] items-start relative w-full">
        <CardTitle />
        <CardDescription />
      </div>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron down">
          <path d="M4 6L8 10L12 6" id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function Select() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[8px] h-[40px] items-center min-w-[120px] pl-[16px] pr-[12px] py-[12px] relative rounded-[8px] shrink-0 w-[120px]" data-name="Select">
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-none min-h-px min-w-px not-italic relative shrink-0 text-[#1e1e1e] text-[16px]">All Tasks</p>
      <ChevronDown />
    </div>
  );
}

function SelectField() {
  return (
    <div className="relative shrink-0" data-name="Select Field">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] items-start relative">
        <Select />
      </div>
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron down">
          <path d="M4 6L8 10L12 6" id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function Select1() {
  return (
    <div className="bg-white h-[40px] min-w-[120px] relative rounded-[8px] shrink-0 w-full" data-name="Select">
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
      <div className="flex flex-row items-center min-w-inherit size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[40px] items-center min-w-inherit pl-[16px] pr-[12px] py-[12px] relative w-full">
          <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-none min-h-px min-w-px not-italic relative shrink-0 text-[#1e1e1e] text-[16px]">All platforms</p>
          <ChevronDown1 />
        </div>
      </div>
    </div>
  );
}

function SelectField1() {
  return (
    <div className="relative shrink-0 w-[149px]" data-name="Select Field">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] items-start relative w-[149px]">
        <Select1 />
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="absolute content-stretch flex gap-[20px] h-[40px] items-center left-[280px] top-[24px] w-[733px]" data-name="Dashboard">
      <Container />
      <SelectField />
      <SelectField1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#0f172b] relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.3125px] whitespace-pre">TI</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Sarah Chen</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[8px] h-[16px] items-center leading-[16px] not-italic relative shrink-0 text-[#717182] text-[12px] text-nowrap w-full whitespace-pre" data-name="Container">
      <p className="relative shrink-0">LinkedIn</p>
      <p className="relative shrink-0">·</p>
      <p className="relative shrink-0">Nov 18</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[36px] items-start relative w-full">
        <Paragraph />
        <Container2 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[40px] relative shrink-0 w-[197.539px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[40px] items-center relative w-[197.539px]">
        <Container1 />
        <Container3 />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_138_238)" id="Icon">
          <path d={svgPaths.p1cf15f00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 5.5L6 7L11 2" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_138_238">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Badge() {
  return (
    <div className="relative rounded-[8px] shrink-0" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[inherit]">
        <Icon />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Fact Check</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_138_251)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17134c00} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_138_251">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_138_242)" id="Icon">
          <path d={svgPaths.p1d19c880} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 2.66667H12" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p22966600} id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_138_242">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon2 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon3 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[32px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[32px] items-center relative">
        <Badge />
        <Button />
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

function RecentPostCard() {
  return (
    <div className="content-stretch flex h-[40px] items-start justify-between relative shrink-0 w-full" data-name="RecentPostCard">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 12.6667V14.6667" id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p4f72080} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1c53e800} id="Vector_3" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full">
      <Icon4 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#0f172b] text-[14px] tracking-[-0.1504px] w-[635px]">{`This is really interesting, but I wonder if it's actually applicable in developing countries. How...`}</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 tracking-[-0.1504px] w-[681px]">New research shows that AI models trained with synthetic data can achieve 95% accuracy...</p>
      <Frame1 />
    </div>
  );
}

function CardContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] items-start px-[24px] py-[16px] relative w-full">
          <RecentPostCard />
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-[-1px] pointer-events-none" />
      <CardContent />
    </div>
  );
}

function Dashboard1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[733px]" data-name="Dashboard">
      <Card />
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#0f172b] relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.3125px] whitespace-pre">TI</p>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Tech Insider</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[8px] h-[16px] items-center leading-[16px] not-italic relative shrink-0 text-[#717182] text-[12px] text-nowrap w-full whitespace-pre" data-name="Container">
      <p className="relative shrink-0">X</p>
      <p className="relative shrink-0">·</p>
      <p className="relative shrink-0">Nov 18</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[36px] items-start relative w-full">
        <Paragraph1 />
        <Container7 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[40px] relative shrink-0 w-[197.539px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[40px] items-center relative w-[197.539px]">
        <Container6 />
        <Container8 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_138_238)" id="Icon">
          <path d={svgPaths.p1cf15f00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 5.5L6 7L11 2" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_138_238">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Badge1() {
  return (
    <div className="relative rounded-[8px] shrink-0" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[inherit]">
        <Icon5 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Fact Check</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_138_251)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17134c00} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_138_251">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon6 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_138_242)" id="Icon">
          <path d={svgPaths.p1d19c880} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 2.66667H12" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p22966600} id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_138_242">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon7 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon8 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[32px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[32px] items-center relative">
        <Badge1 />
        <Button3 />
        <Button4 />
        <Button5 />
      </div>
    </div>
  );
}

function RecentPostCard1() {
  return (
    <div className="content-stretch flex h-[40px] items-start justify-between relative shrink-0 w-full" data-name="RecentPostCard">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 12.6667V14.6667" id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p4f72080} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1c53e800} id="Vector_3" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full">
      <Icon9 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#0f172b] text-[14px] tracking-[-0.1504px] w-[635px]">Seems too exaggerated? No concrete data. Looks like stock manipulation intent.</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <p className="[white-space-collapse:collapse] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] w-[681px]">BREAKING: Major tech company announces revolutionary quantum computing breakthrough. Stock price expected to soar! 🚀</p>
      <Frame4 />
    </div>
  );
}

function CardContent1() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] items-start px-[24px] py-[16px] relative w-full">
          <RecentPostCard1 />
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-[-1px] pointer-events-none" />
      <CardContent1 />
    </div>
  );
}

function Dashboard2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[733px]" data-name="Dashboard">
      <Card1 />
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#0f172b] relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.3125px] whitespace-pre">TI</p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Prof. Michael Torres</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[8px] h-[16px] items-center leading-[16px] not-italic relative shrink-0 text-[#717182] text-[12px] text-nowrap w-full whitespace-pre" data-name="Container">
      <p className="relative shrink-0">LinkedIn</p>
      <p className="relative shrink-0">·</p>
      <p className="relative shrink-0">Nov 18</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[36px] items-start relative w-full">
        <Paragraph2 />
        <Container12 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[40px] relative shrink-0 w-[197.539px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[40px] items-center relative w-[197.539px]">
        <Container11 />
        <Container13 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_138_238)" id="Icon">
          <path d={svgPaths.p1cf15f00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 5.5L6 7L11 2" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_138_238">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Badge2() {
  return (
    <div className="relative rounded-[8px] shrink-0" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[inherit]">
        <Icon10 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Fact Check</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_138_251)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17134c00} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_138_251">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon11 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_138_242)" id="Icon">
          <path d={svgPaths.p1d19c880} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 2.66667H12" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p22966600} id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_138_242">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon12 />
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon13 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[32px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[32px] items-center relative">
        <Badge2 />
        <Button6 />
        <Button7 />
        <Button8 />
      </div>
    </div>
  );
}

function RecentPostCard2() {
  return (
    <div className="content-stretch flex h-[40px] items-start justify-between relative shrink-0 w-full" data-name="RecentPostCard">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 12.6667V14.6667" id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p4f72080} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1c53e800} id="Vector_3" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full">
      <Icon14 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#0f172b] text-[14px] tracking-[-0.1504px] w-[635px]">Need to read the full thread later. Seems applicable to urban planning project.</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <p className="[white-space-collapse:collapse] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] w-[681px]">After 10 years of research, our team has identified key factors in sustainable urban development. Thread: 1/5</p>
      <Frame5 />
    </div>
  );
}

function CardContent2() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] items-start px-[24px] py-[16px] relative w-full">
          <RecentPostCard2 />
          <Frame6 />
        </div>
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start p-px relative shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-[-1px] pointer-events-none" />
      <CardContent2 />
    </div>
  );
}

function Dashboard3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[733px]" data-name="Dashboard">
      <Card2 />
    </div>
  );
}

function Dashboard4() {
  return <div className="h-[226px] shrink-0 w-[733px]" data-name="Dashboard" />;
}

function Dashboard5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[775px] items-start left-[280px] top-[88px]" data-name="Dashboard">
      <Dashboard1 />
      <Dashboard2 />
      {[...Array(4).keys()].map((_, i) => (
        <Dashboard3 key={i} />
      ))}
      <Dashboard4 />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[24px] left-0 top-[-20000px] w-[9.719px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">3</p>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_155_571)" id="Icon">
          <path d="M10 15V4.16667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p28aa85e0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2f3a5fc0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p28f84600} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p281563c0} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3750e2c0} id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p140e6400} id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2a64bf00} id="Vector_8" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_155_571">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[#0f172b] relative rounded-[14px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon15 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-0 tracking-[-0.4395px] whitespace-pre">Insight Capture</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#45556c] text-[12px] text-nowrap top-px whitespace-pre">AI Assistant</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[44px] relative shrink-0 w-[122.773px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-start relative w-[122.773px]">
        <Heading />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[12px] h-[44px] items-center relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container17 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-[44.47px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#0f172b] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <Icon16 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[119.47px] not-italic text-[14px] text-center text-nowrap text-white top-[8.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Capture Post</p>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3ac0b600} id="Vector" stroke="var(--stroke-0, #0F172B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3c797180} id="Vector_2" stroke="var(--stroke-0, #0F172B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[79.227px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[79.227px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[40px] not-italic text-[#0f172b] text-[16px] text-center text-nowrap top-[-0.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Dashboard</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[48px] items-center pl-[16px] pr-0 py-0 relative w-full">
          <Icon17 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p12dcd500} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[34.258px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[34.258px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[17.5px] not-italic text-[#45556c] text-[16px] text-center text-nowrap top-[-0.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Chat</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[48px] items-center pl-[16px] pr-0 py-0 relative w-full">
          <Icon18 />
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1d609380} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3fe63d80} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[40.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[40.891px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[20.5px] not-italic text-[#45556c] text-[16px] text-center text-nowrap top-[-0.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Tasks</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-slate-100 h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[48px] items-center pl-[16px] pr-0 py-0 relative w-full">
          <Icon19 />
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_155_563)" id="Icon">
          <path d="M10 5V10L13.3333 11.6667" id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p14d24500} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_155_563">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[51.945px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[51.945px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[26.5px] not-italic text-[#45556c] text-[16px] text-center text-nowrap top-[-0.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">History</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[48px] items-center pl-[16px] pr-0 py-0 relative w-full">
          <Icon20 />
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p18406864} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[56.531px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[56.531px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[28px] not-italic text-[#45556c] text-[16px] text-center text-nowrap top-[-0.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Authors</p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[48px] items-center pl-[16px] pr-0 py-0 relative w-full">
          <Icon21 />
          <Text5 />
        </div>
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_155_552)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p35ba4680} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3dfd2600} id="Vector_3" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_155_552">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[59.969px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[59.969px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[30.5px] not-italic text-[#45556c] text-[16px] text-center text-nowrap top-[-0.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Account</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[48px] items-center pl-[16px] pr-0 py-0 relative w-full">
          <Icon22 />
          <Text6 />
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[328px] items-start relative shrink-0 w-full" data-name="Navigation">
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
      <Button14 />
      <Button15 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[512px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] h-[512px] items-start pb-0 pt-[24px] px-[24px] relative w-full">
          <Container18 />
          <Button9 />
          <Navigation />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col h-[763px] items-start left-0 pl-0 pr-px py-0 top-[27px] w-[256px]" data-name="App">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-slate-200 border-solid inset-0 pointer-events-none" />
      <Container19 />
    </div>
  );
}

function AiInformationCaptureAssistant() {
  return (
    <div className="absolute bg-white h-[863px] left-0 top-0 w-[1037px]" data-name="AI Information Capture Assistant">
      <Dashboard />
      <Dashboard5 />
      <Text />
      <App />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <AiInformationCaptureAssistant />
    </div>
  );
}