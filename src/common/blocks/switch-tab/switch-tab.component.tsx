import React, { useCallback, useEffect, useState, ComponentType } from 'react'
import clsx from 'clsx'
import DefaultSwitchTabHeader from './default-switch-tab-header.template'

interface TabConfig {
  id: string;
  label: string | React.ReactNode;
  content?: any;
  checked?: boolean;
  disabled?: boolean;
  tabIndex?: number;
}

export interface SwitchTabHeaderProps {
  activeTabId: string;
  handleChangeTab: (tabKey: string) => any;
  tabs: TabConfig[];
}

interface SwitchTabProps {
  activeTabId?: string;
  onTabChange?: (tabKey: string) => any;
  tabs: TabConfig[];
  tabHeader?: ComponentType<SwitchTabHeaderProps>;
}

export default function SwitchTab(props: SwitchTabProps) {
  const defaultActiveTabId = props.tabs.find((tab) => !tab.disabled).id || props.tabs[0].id;
  const [activeTabId, setActiveTabId] = useState(defaultActiveTabId);

  const { onTabChange } = props;

  useEffect(() => {
    props.activeTabId && setActiveTabId(props.activeTabId);
  }, [props.activeTabId])

  const handleChangeTab = useCallback((tabKey) => () => {
    setActiveTabId(tabKey);

    onTabChange && onTabChange(tabKey);
  }, [onTabChange]);

  return (
    <>
      {props.tabHeader ? (
        <props.tabHeader
          activeTabId={activeTabId}
          handleChangeTab={handleChangeTab}
          tabs={props.tabs}
        />
      ) : (
        <DefaultSwitchTabHeader
          activeTabId={activeTabId}
          handleChangeTab={handleChangeTab}
          tabs={props.tabs}
        />
      )}

      {props.tabs.map((tab, index) => (
        <div
          className={clsx('b-tab__content', {
            'h-d_none': activeTabId !== tab.id,
          })}
          key={index}
        >
          {tab.content}
        </div>
      ))}
    </>
  )
}
