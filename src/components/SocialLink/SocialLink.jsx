import React from 'react';
import Image from 'next/image';

const SocialLink = () => {
    return (
        <div className="hidden md:flex w-fit h-[51px] flex-col">
            <h6 className="font-machina text-sm text-[#1D1C1F] mb-[4px]">Social Link</h6>
            <div className="flex border border-[#D3D8DF] w-fit shrink-0">
              <a href="https://www.instagram.com/thisismohidul/" target="_blank" rel="noopener noreferrer" className="w-[33px] h-[33px] min-w-[33px] min-h-[33px] p-[5.5px] border-r border-[#D3D8DF] flex items-center justify-center box-border">
                <Image src="/images/hero/instagram.svg" alt="instagram" width={22} height={22} className="w-[22px] h-[22px] flex-shrink-0" unoptimized />
              </a>
              <a href="https://www.linkedin.com/in/thisismohidul/" target="_blank" rel="noopener noreferrer" className="w-[33px] h-[33px] min-w-[33px] min-h-[33px] p-[5.5px] border-r border-[#D3D8DF] flex items-center justify-center box-border">
                <Image src="/images/hero/linkedin.svg" alt="linkedin" width={22} height={22} className="w-[22px] h-[22px] flex-shrink-0" unoptimized />
              </a>
              <a href="https://dribbble.com/thisismohidul" target="_blank" rel="noopener noreferrer" className="w-[33px] h-[33px] min-w-[33px] min-h-[33px] p-[5.5px] border-r border-[#D3D8DF] flex items-center justify-center box-border">
                <Image src="/images/hero/dribbble.svg" alt="dribbble" width={22} height={22} className="w-[22px] h-[22px] flex-shrink-0" unoptimized />
              </a>
              <a href="https://www.behance.net/thisismohidul" target="_blank" rel="noopener noreferrer" className="w-[33px] h-[33px] min-w-[33px] min-h-[33px] p-[5.5px] flex items-center justify-center box-border">
                <Image src="/images/hero/behance-01.svg" alt="behance" width={22} height={22} className="w-[22px] h-[22px] flex-shrink-0" unoptimized />
              </a>
            </div>
          </div>
    );
};

export default SocialLink;