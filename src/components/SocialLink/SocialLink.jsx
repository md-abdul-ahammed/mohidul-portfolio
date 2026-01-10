import React from 'react';

const SocialLink = () => {
    return (
        <div className="hidden md:flex w-[129px] h-[51px] flex-col">
            <h6 className="text-sm text-[#1D1C1F] mb-[4px]">Social Link</h6>
            <div className="flex border border-[#D3D8DF] w-fit">
              <div className="p-[5px] border-r border-[#D3D8DF] flex items-center justify-center">
                <Image
                  src="/images/hero/instagram.svg"
                  alt="instagram"
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px]"
                  unoptimized
                />
              </div>

              <div className="p-[5px] border-r border-[#D3D8DF] flex items-center justify-center">
                <Image
                  src="/images/hero/linkedin-02.svg"
                  alt="linkedin"
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px]"
                  unoptimized
                />
              </div>

              <div className="p-[5px] border-r border-[#D3D8DF] flex items-center justify-center">
                <Image
                  src="/images/hero/dribbble.svg"
                  alt="dribbble"
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px]"
                  unoptimized
                />
              </div>

              <div className="p-[5px] flex items-center justify-center">
                <Image
                  src="/images/hero/behance-01.svg"
                  alt="behance"
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px]"
                  unoptimized
                />
              </div>
            </div>
          </div>
    );
};

export default SocialLink;