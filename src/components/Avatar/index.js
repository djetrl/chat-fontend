import PropsType from 'prop-types';
import { generateAvatarFromHash } from '../../utils/helpers';

import './Avatar.scss';

const Avatar = ({ user }) => {
  if (user && user.avatar[0] ) {
    return (
      <img
        className="avatar"
        src={user.avatar[0].url}
        alt={`Avatar ${user.fullname}`}
      />
    );
  } else {
    let hash ="e286d7515c2dfa2acd0bb1de5976d92e";
    let firstChar = 'f';
    if(user && user.fullname[0] && user._id){
      hash = user._id
      firstChar = user.fullname[0].toUpperCase();
    }
    const { color, colorLighten } = generateAvatarFromHash(hash);
    return (
      <div
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`
        }}
        className="avatar avatar--symbol"
      >
        {firstChar}
      </div>
    );
  }

};


Avatar.prototype={
  className:PropsType.string
}
export default Avatar