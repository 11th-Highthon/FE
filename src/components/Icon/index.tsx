import * as icons from './icons';

export type IconNames = keyof typeof icons;

export const Icon = ({
  icon,
  color = 'white',
  size,
  classname,
}: {
  icon: IconNames;
  color?: string;
  size: number;
  classname?: string;
}) => {
  const Component = icons[icon];

  return (
    <Component width={size} height={size} color={color} className={classname} />
  );
};
