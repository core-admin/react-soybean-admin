import { getPaletteColorByNumber, mixColor } from '@sa/color';
import { Card } from 'antd';
import { Outlet } from 'react-router-dom';

import WaveBg from '@/components/stateless/custom/WaveBg';
import { ThemeContext } from '@/features';
import { getThemeSettings } from '@/store/slice/theme';

import Header from './modules/Header';

const COLOR_WHITE = '#ffffff';

function useBgColor() {
  const { darkMode } = useContext(ThemeContext);
  const { themeColor } = useAppSelector(getThemeSettings);

  const bgThemeColor = darkMode ? getPaletteColorByNumber(themeColor, 600) : themeColor;
  const ratio = darkMode ? 0.5 : 0.2;
  const bgColor = mixColor(COLOR_WHITE, themeColor, ratio);

  return {
    bgColor,
    bgThemeColor
  };
}

export function Component() {
  const { bgColor, bgThemeColor } = useBgColor();

  return (
    <div
      className="relative size-full flex-center overflow-hidden bg-layout"
      style={{ backgroundColor: bgColor }}
    >
      <WaveBg themeColor={bgThemeColor} />

      <Card
        bordered={false}
        className="relative z-4 w-auto rd-12px"
      >
        <div className="w-400px lt-sm:w-300px">
          <Header />
          <main className="pt-24px">
            <Outlet />
          </main>
        </div>
      </Card>
    </div>
  );
}
