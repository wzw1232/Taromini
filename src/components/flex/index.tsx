import { View, ViewProps } from '@tarojs/components';
import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './index.module.scss';

interface Props extends ViewProps {
  children?: ReactNode;
  style?: React.CSSProperties;
  align?: 'center' | 'end' | 'start' | 'baseline';
  justify?: 'center' | 'end' | 'between' | 'around' | 'evenly' | 'stretch';
  direction?: 'row' | 'column';
  wrap?: boolean;
}

const Container = ({ align, justify, children, ...props }: Props) => {
  return <View {...props}>{children}</View>;
};

const Flex: React.FC<Props> = ({
  className,
  align,
  justify,
  direction = 'row',
  wrap,
  children,
  style,
  ...props
}: Props) => {
  return (
    <Container
      style={style}
      className={classNames(styles.box, className, {
        [styles.flexColumn]: direction === 'column',
        [styles.flexRow]: direction === 'row',
        [styles.itemCenter]: align === 'center',
        [styles.itemEnd]: align === 'end',
        [styles.itemStart]: align === 'start',
        [styles.itemBaseline]: align === 'baseline',
        [styles.justifyCenter]: justify === 'center',
        [styles.justifyEnd]: justify === 'end',
        [styles.justifyBetween]: justify === 'between',
        [styles.justifyAround]: justify === 'around',
        [styles.justifyEvenly]: justify === 'evenly',
        [styles.justifyStretch]: justify === 'stretch',
        [styles.wrap]: wrap,
      })}
      {...props}
    >
      {children}
    </Container>
  );
};
export default Flex;
