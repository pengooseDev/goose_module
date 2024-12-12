import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
  CSSProperties,
} from 'react';

interface LayoutProps extends React.PropsWithChildren {
  top?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  bottom?: ReactNode;
  innerPadding?: string;
  style?: CSSProperties;
}

const Section = ({
  children,
  style,
  measureRef,
}: {
  children: ReactNode;
  style: CSSProperties;
  measureRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div ref={measureRef} style={style}>
      {children}
    </div>
  );
};

const useMeasure = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (ref.current) {
      const { clientHeight, clientWidth } = ref.current;
      setSize({ height: clientHeight, width: clientWidth });
    }
  }, []);

  return [ref, size] as const;
};

export const Layout = ({
  top,
  left,
  right,
  bottom,
  children,
  innerPadding,
  style,
}: LayoutProps) => {
  const [topRef, topSize] = useMeasure();
  const [bottomRef, bottomSize] = useMeasure();
  const [leftRef] = useMeasure();
  const [rightRef] = useMeasure();

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    ...style,
  };

  const contentAreaStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  };

  const sideStyle = (height: number): CSSProperties => ({
    height: `calc(100vh - ${height}px`,
    overflowY: 'auto',
    flexShrink: 0,
  });

  const mainContentStyle: CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: innerPadding || '0',
  };

  const totalHeight = topSize.height + bottomSize.height;

  return (
    <div style={containerStyle}>
      {/* Top */}
      {top && (
        <Section measureRef={topRef} style={{ flexShrink: 0 }}>
          {top}
        </Section>
      )}

      <div style={contentAreaStyle}>
        {/* Left */}
        {left && (
          <Section measureRef={leftRef} style={sideStyle(totalHeight)}>
            {left}
          </Section>
        )}

        {/* Main Content */}
        <div style={mainContentStyle}>{children}</div>

        {/* Right */}
        {right && (
          <Section measureRef={rightRef} style={sideStyle(totalHeight)}>
            {right}
          </Section>
        )}
      </div>

      {/* Bottom */}
      {bottom && (
        <Section measureRef={bottomRef} style={{ flexShrink: 0 }}>
          {bottom}
        </Section>
      )}
    </div>
  );
};
