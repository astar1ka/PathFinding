import SettingsData from './services/SettingsData';
import Simulator from './services/simulator/Simulator';

import Settings from './modules/settings/Settings';
import Tools from './modules/tools/Tools';
import View from './modules/view/View';
import Loading from './modules/loading/Loading';

import './App.css';

const settings: SettingsData = new SettingsData;
const simulator = new Simulator(settings);

function App() {
  return (
    <div className="App">
      <Loading settings={settings} simulator={simulator}/>
      <Settings settings={settings} simulator={simulator}/>
      <View settings={settings} simulator={simulator}/>
      <Tools settings={settings} simulator={simulator} />
    </div>
  );
}

export default App;
