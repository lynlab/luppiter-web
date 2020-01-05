import React from 'react';

type AuthorizeAppProps = {
  onAuthorize: () => void;
  onDecline: () => void;
};

export default (props: AuthorizeAppProps) => (
  <div>
    <p>Application needs permission to access your account.</p>
    <button className="w-full mt-4 mb-2 py-2 rounded-sm bg-purple-700" type="button" onClick={props.onAuthorize}>Authorize</button>
  </div>
);
