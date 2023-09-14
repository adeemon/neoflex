import * as React from 'react';


export interface ITabsPair {
  name: string;
  component: JSX.Element;
}

export interface ITabsManagerProps {
  tabsArray: ITabsPair[];
}
export const TabsManager: React.FC<ITabsManagerProps> = ({ tabsArray }) => {
  const [activeTab, setActiveTab] = React.useState('About card');
  const onCLickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const clickedTab = e.currentTarget.textContent || 'About card';
    setActiveTab(clickedTab);
  };

  const tabsToRender = tabsArray.map((note) =>
    (
      <button
        className={ `tabs-manager__tab${activeTab === note.name ? '-active' : ''}` }
        onClick={ onCLickHandler }
        key={ note.name }
        type="button"
      >
        { note.name }
      </button>
    ));

  return (
    <section className="tabs-manager">
      <div className="tabs-manager__tabs-container">
        { tabsToRender }
        <div className="tabs-manager__spacer" />
      </div>
      <div className="tabs-manager__content">
        { tabsArray.filter((note) =>
          note.name === activeTab)[0].component }
      </div>
    </section>
  );
};
