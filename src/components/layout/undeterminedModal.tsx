import styles from './index.less';
import React, { useState } from 'react';
import { WingBlank, Flex } from 'antd-mobile';

interface Props {
  undetermined: Undetermined;
  onChange: (arg0: Undetermined) => any;
  show: boolean /**后备条件 */;
  after?: After;
  reset: () => any;
}

export interface After {
  /**标题 */
  title: string;
  /**条件 */
  context: any;
}

/**待选择条件列表 */
export type Undetermined = Array<Item>;

/**待选择的项目 */
interface Item {
  id: string | number;
  label: any;
  checked?: boolean;
}

/**条件模态框口 */
export default function UndeterminedModal({ undetermined, onChange, show, after, reset }: Props) {
  const [selfUndetermined, setSelfUndetermined] = useState([...undetermined]);
  /**点击某个条件时 */
  const handleClickUndetermined = (index: number, item: Item): any => () => {
    const _undetermined = [...selfUndetermined];
    _undetermined.splice(index, 1, { ...item, checked: !item.checked });
    setSelfUndetermined(_undetermined);
  };
  const submit = () => onChange(selfUndetermined);
  const _reset = () => {
    setSelfUndetermined([...undetermined]);
    onChange([...undetermined]);
    reset();
  };
  /**渲染条件列表 */
  const undeterminedList = selfUndetermined.map((_, index) => (
    <Flex
      key={_.id}
      align="center"
      justify="center"
      onClick={handleClickUndetermined(index, _)}
      className={_.checked ? 'checked undetermined' : 'undetermined'}
    >
      {_.label}
    </Flex>
  ));
  /**备用条件 */
  const afterContext = after && (
    <div>
      <div className="after-title">{after.title}</div>
      {after.context}
    </div>
  );
  /**父级点击事件 */
  const maskClick = (e: any) => {
    if (e.target.id === 'layoutModal') {
      onChange(undetermined);
    }
  };
  return (
    <div
      className={styles.layoutModal}
      style={{ display: show ? 'block' : 'none' }}
      id="layoutModal"
      onClick={maskClick}
    >
      <div className="content">
        <WingBlank>
          <div className="title">快速筛选</div>
          <div className="undetermined-list">{undeterminedList}</div>
          {afterContext}
        </WingBlank>
      </div>
      <Flex style={{ backgroundColor: '#fff' }}>
        <Flex.Item className="btn" onClick={_reset}>
          重置
        </Flex.Item>
        <Flex.Item className="btn" onClick={submit}>
          确认
        </Flex.Item>
      </Flex>
    </div>
  );
}
