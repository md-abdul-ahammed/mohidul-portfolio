import Image from "next/image";
import Link from "next/link";
import React from "react";

const Case = () => {
  return (
    <div>
  <div className="md:mx-2">
    <div className="md:max-w-[1444px] px-4 mx-auto md:border-x border-b border-[#D3D8DF]">
      <div className="pt-10">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-3">
          <h5 className="text-[#66656A]">Home</h5>
          <h5 className="text-[#66656A]">/</h5>
          <h5 className="text-[#1D1C1F] py-1 px-1.5 bg-[#EFEFEF]">Case</h5>
        </div>

        {/* Title and description */}
        <div className="mt-4 md:mt-6 lg:mt-10 mb-10 md:mb-16 lg:mb-24 md:justify-between">
          <h1 className="text-[48px] md:text-5xl lg:text-8xl font-medium text-[#1D1C1F] mb-4 md:mb-6 ">
            Case Studies
          </h1>
          <p className="text-base text-[#66656A] max-w-full md:max-w-[500px] lg:w-[694px]">
            Every design tells a story — shaped by challenges, users, and context. These projects explore how thoughtful interfaces improve real outcomes. From product strategy to final visuals, here's what made an impact.
          </p>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-[40px] lg:gap-y-[60px] md:gap-x-[60px] lg:gap-x-[228px] pb-20 md:pb-24 lg:pb-32">
        {/* 1 */}
        <div className="max-w-full md:max-w-[700px]">
          <div className="w-full max-w-[360px] h-[250px] md:w-[500px] md:h-[360px] lg:w-[700px] lg:h-[500px] md:max-w-none mx-auto">
            <Link href={'/project'}>
            <Image
              src={"/images/case/case1.png"}
              alt="1"
              width={700}
              height={500}
              className="w-full h-full object-cover"
            />
            </Link>
          </div>
          <div className="mt-3 flex flex-col md:flex-row md:justify-between md:items-center">
            <h1 className="text-[24px] md:text-[28px] lg:text-[34px] text-[#1D1C1F] font-medium">
              The pixlplay studio
            </h1>
            <div className="text-[#66656A] text-sm flex flex-wrap gap-2 mt-2 md:mt-0">
              <p className="px-3 py-1 bg-[#EDEDEF]">Design</p>
              <p className="px-3 py-1 bg-[#EDEDEF]">Branding</p>
              <p className="px-3 py-1 bg-[#EDEDEF]">Development</p>
            </div>
          </div>
        </div>

        {/* 2 */}
        <div className="max-w-full md:flex md:justify-end">
          <div>
            <div className="w-full max-w-[360px] h-[250px] md:w-[350px] md:h-[240px] lg:w-[448px] lg:h-[300px] md:max-w-none mx-auto">
                          <Link href={'/project'}>

              <Image
                src={"/images/case/case2.png"}
                alt="2"
                width={448}
                height={300}
                className="w-full h-full object-cover"
              />
                          </Link>

            </div>
            <div className="mt-3">
              <h1 className="text-[24px] md:text-[34px] text-[#1D1C1F] font-medium leading-tight">
                The pixlplay studio
              </h1>
              <div className="text-[#66656A] text-sm flex flex-wrap gap-2 mt-2">
                <p className="px-3 py-1 bg-[#EDEDEF]">Design</p>
                <p className="px-3 py-1 bg-[#EDEDEF]">Branding</p>
                <p className="px-3 py-1 bg-[#EDEDEF]">Development</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 */}
        <div className="col-span-1 md:col-span-2 flex md:justify-center">
          <div>
            <div className="w-full max-w-[360px] h-[250px] md:w-[500px] md:h-[360px] lg:w-[700px] lg:h-[500px] md:max-w-none mx-auto">
                          <Link href={'/project'}>

              <Image
                src={"/images/case/case3.png"}
                alt="3"
                width={700}
                height={420}
                className="w-full h-full object-cover"
              />
                          </Link>

            </div>
            <div className="mt-3 flex flex-col md:flex-row md:justify-between md:items-center">
              <h1 className="text-[24px] md:text-[34px] text-[#1D1C1F] font-medium leading-tight">
                The pixlplay studio
              </h1>
              <div className="text-[#66656A] text-sm flex flex-wrap gap-2 mt-2 md:mt-0">
                <p className="px-3 py-1 bg-[#EDEDEF]">Design</p>
                <p className="px-3 py-1 bg-[#EDEDEF]">Branding</p>
                <p className="px-3 py-1 bg-[#EDEDEF]">Development</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 */}
        <div className="max-w-full md:max-w-[700px]">
          <div className="w-full max-w-[360px] h-[250px] md:w-[500px] md:h-[360px] lg:w-[700px] lg:h-[500px] md:max-w-none mx-auto">
                        <Link href={'/project'}>

            <Image
              src={"/images/case/case4.png"}
              alt="4"
              width={687}
              height={450}
              className="w-full h-full object-cover"
            />
                        </Link>

          </div>
          <div className="mt-3 flex flex-col md:flex-row md:justify-between md:items-center">
            <h1 className="text-[24px] md:text-[28px] lg:text-[34px] text-[#1D1C1F] font-medium">
              The pixlplay studio
            </h1>
            <div className="text-[#66656A] text-sm flex flex-wrap gap-2 mt-2 md:mt-0">
              <p className="px-3 py-1 bg-[#EDEDEF]">Design</p>
              <p className="px-3 py-1 bg-[#EDEDEF]">Branding</p>
              <p className="px-3 py-1 bg-[#EDEDEF]">Development</p>
            </div>
          </div>
        </div>

        {/* 5 */}
        <div className="max-w-full md:flex md:justify-end">
          <div>
            <div className="w-full max-w-[360px] h-[250px] md:w-[350px] md:h-[240px] lg:w-[448px] lg:h-[300px] md:max-w-none mx-auto">
                          <Link href={'/project'}>

              <Image
                src={"/images/case/case5.png"}
                alt="5"
                width={448}
                height={300}
                className="w-full h-full object-cover"
              />
                          </Link>

            </div>
            <div className="mt-3">
              <h1 className="text-[24px] md:text-[34px] text-[#1D1C1F] font-medium leading-tight">
                The pixlplay studio
              </h1>
              <div className="text-[#66656A] text-sm flex flex-wrap gap-2 mt-2">
                <p className="px-3 py-1 bg-[#EDEDEF]">Design</p>
                <p className="px-3 py-1 bg-[#EDEDEF]">Branding</p>
                <p className="px-3 py-1 bg-[#EDEDEF]">Development</p>
              </div>
            </div>
          </div>
        </div>

        {/* 6 */}
        <div className="max-w-full">
          <div className="w-full max-w-[360px] h-[250px] md:w-[448px] md:h-[300px] md:max-w-none">
                        <Link href={'/project'}>

            <Image
              src={"/images/case/case6.png"}
              alt="6"
              width={448}
              height={300}
              className="w-full h-full object-cover"
            />
                        </Link>

          </div>
          <div className="mt-3">
            <h1 className="text-[24px] md:text-[34px] text-[#1D1C1F] font-medium leading-tight">
              The pixlplay studio
            </h1>
            <div className="text-[#66656A] text-sm flex flex-wrap gap-2 mt-2 md:mt-0">
              <p className="px-3 py-1 bg-[#EDEDEF]">Design</p>
              <p className="px-3 py-1 bg-[#EDEDEF]">Branding</p>
              <p className="px-3 py-1 bg-[#EDEDEF]">Development</p>
            </div>
          </div>
        </div>

        {/* 7 */}
        <div className="max-w-full md:flex md:justify-end">
          <div className="max-w-full md:max-w-[700px]">
            <div className="w-full max-w-[360px] h-[250px] md:w-[500px] md:h-[360px] lg:w-[700px] lg:h-[500px] md:max-w-none mx-auto">
                          <Link href={'/project'}>

              <Image
                src={"/images/case/case7.png"}
                alt="7"
                width={687}
                height={450}
                className="w-full h-full object-cover"
              />
                          </Link>

            </div>
            <div className="mt-3 flex flex-col md:flex-row md:justify-between md:items-center">
              <h1 className="text-[24px] md:text-[28px] lg:text-[34px] text-[#1D1C1F] font-medium">
                The pixlplay studio
              </h1>
              <div className="text-[#66656A] text-sm flex flex-wrap gap-2 mt-2 md:mt-0">
                <p className="px-3 py-1 bg-[#EDEDEF]">Design</p>
                <p className="px-3 py-1 bg-[#EDEDEF]">Branding</p>
                <p className="px-3 py-1 bg-[#EDEDEF]">Development</p>
              </div>
            </div>
          </div>
        </div>

        {/* 8 */}
        <div className="col-span-1 md:col-span-2 flex md:justify-center">
          <div>
            <div className="w-full max-w-[360px] h-[250px] md:w-[500px] md:h-[360px] lg:w-[700px] lg:h-[500px] md:max-w-none mx-auto">
                          <Link href={'/project'}>

              <Image
                src={"/images/case/case3.png"}
                alt="8"
                width={700}
                height={420}
                className="w-full h-full object-cover"
              />
                          </Link>

            </div>
            <div className="mt-3 flex flex-col md:flex-row md:justify-between md:items-center">
              <h1 className="text-[24px] md:text-[34px] text-[#1D1C1F] font-medium leading-tight">
                The pixlplay studio
              </h1>
              <div className="text-[#66656A] text-sm flex flex-wrap gap-2 mt-2 md:mt-0">
                <p className="px-3 py-1 bg-[#EDEDEF]">Design</p>
                <p className="px-3 py-1 bg-[#EDEDEF]">Branding</p>
                <p className="px-3 py-1 bg-[#EDEDEF]">Development</p>
              </div>
            </div>
          </div>
        </div>

        {/* 9 */}
        <div className="max-w-full">
          <div className="w-full max-w-[360px] h-[250px] md:w-[500px] md:h-[360px] lg:w-[700px] lg:h-[500px] md:max-w-none mx-auto">
                        <Link href={'/project'}>

            <Image
              src={"/images/case/case1.png"}
              alt="9"
              width={700}
              height={500}
              className="w-full h-full object-cover"
            />
                        </Link>

          </div>
          <div className="mt-3 flex flex-col md:flex-row md:justify-between md:items-center">
            <h1 className="text-[24px] md:text-[28px] lg:text-[34px] text-[#1D1C1F] font-medium">
              The pixlplay studio
            </h1>
            <div className="text-[#66656A] text-sm flex flex-wrap gap-2 mt-2 md:mt-0">
              <p className="px-3 py-1 bg-[#EDEDEF]">Design</p>
              <p className="px-3 py-1 bg-[#EDEDEF]">Branding</p>
              <p className="px-3 py-1 bg-[#EDEDEF]">Development</p>
            </div>
          </div>
        </div>

        {/* 10 */}
        <div className="max-w-full md:flex md:justify-end">
          <div>
            <div className="w-full max-w-[360px] h-[250px] md:w-[350px] md:h-[240px] lg:w-[448px] lg:h-[300px] md:max-w-none mx-auto">
                          <Link href={'/project'}>

              <Image
                src={"/images/case/case2.png"}
                alt="10"
                width={448}
                height={300}
                className="w-full h-full object-cover"
              />
                          </Link>

            </div>
            <div className="mt-3">
              <h1 className="text-[24px] md:text-[34px] text-[#1D1C1F] font-medium leading-tight">
                The pixlplay studio
              </h1>
              <div className="text-[#66656A] text-sm flex flex-wrap gap-2 mt-2">
                <p className="px-3 py-1 bg-[#EDEDEF]">Design</p>
                <p className="px-3 py-1 bg-[#EDEDEF]">Branding</p>
                <p className="px-3 py-1 bg-[#EDEDEF]">Development</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Case;
