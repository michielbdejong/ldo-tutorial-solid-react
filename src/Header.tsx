import { FunctionComponent } from "react";
import { useResource, useSolidAuth, useSubject } from "@ldo/solid-react";
import { SolidProfileShapeShapeType } from "./.ldo/solidProfile.shapeTypes";
const { Application } = require('@janeirodigital/interop-application');

const CLIENT_ID = 'http://localhost:3006/id.json';

export const Header: FunctionComponent = () => {
  const { session, login, logout, fetch } = useSolidAuth();

  const webIdResource = useResource(session.webId);
  const profile = useSubject(SolidProfileShapeShapeType, session.webId);

  const loggedInName = webIdResource?.isReading()
    ? "LOADING..."
    : profile?.fn
    ? profile.fn
    : session.webId;

    // let saiSession: unknown;
    const saiAuth = async () => {
      console.log('saiAuth');
      // if (saiSession) return;
      if (!session) return;
      const webId = session.webId as string;
      const deps = { fetch, randomUUID: crypto.randomUUID.bind(crypto) };
      await Application.build(webId, CLIENT_ID, deps);
    }
    
    saiAuth();
  
  return (
    <header>
      {session.isLoggedIn ? (
        // Is the session is logged in
        <p>
          You are logged as {loggedInName}.{" "}
          <button onClick={logout}>Log Out</button>
        </p>
      ) : (
        // If the session is not logged in
        <p>
          You are not Logged In{" "}
          <button
            onClick={() => {
              // Get the Solid issuer the user should log into
              const issuer = prompt(
                "Enter your Solid Issuer",
                "https://solidweb.me"
              );
              if (!issuer) return;
              login(issuer);
            }}
          >
            Log In
          </button>
        </p>
      )}
      <hr />
    </header>
  );
};
