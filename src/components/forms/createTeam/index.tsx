'use client';
import { checkName, createTeam, joinTeam } from '@/src/server/actions';
import { useContext, useEffect, useState } from 'react';
import { ProgressContext } from '../../progressProvider';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { UserRoundPlus, Users } from 'lucide-react';
import { Input } from '../../ui/input';

export default function CreateTeam() {
  const { currentState, maxState, setCurrentState, setMaxState } =
    useContext(ProgressContext);

  const [teamId, setTeamId] = useState('');
  const [isNameAvailable, setIsNameAvailable] = useState(false);
  const [Error, setError] = useState('');
  const [Message, setMessage] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (isWaiting) setTimeout(() => setIsWaiting(false), 200);
  }, [isWaiting]);

  const nameHandler = async (name: string) => {
    if (!isWaiting && name.length > 3) {
      const res = await checkName(name);
      if (
        res.status === 'success' &&
        (res.message === true || res.message === false)
      ) {
        console.log(res.message);
        setIsNameAvailable(res.message);
      } else {
        setError(res.message as string);
      }
    } else setIsNameAvailable(false);
  };

  useEffect(() => {
    if (Error) setTimeout(() => setError(''), 2000);
    if (Message) setTimeout(() => setMessage(''), 2000);
  }, [Error, Message]);

  if (currentState !== 1) return <></>;

  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle className="text-center">Team management</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="flex rounded-lg flex-col justify-evenly m-auto">
          <div className="flex w-full justify-center">
            {(Error || Message) && (
              <Badge
                className={`text-center w-fit -mt-2 ${
                  !Error ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {Error || Message}
              </Badge>
            )}
          </div>

          <div className="flex lg:flex-row flex-col justify-center items-center gap-3 my-4">
            <Card className="w-full p-5">
              <CardContent>
                <form
                  className="flex flex-col gap-2 text-center"
                  onSubmit={async (e) => {
                    setLoading(true);
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const res = await createTeam(formData);
                    if (res.status === 'error') setError(res.message);
                    if (res.status === 'success') {
                      setMessage(res.message);
                      setCurrentState(2);
                      maxState <= 2 && setMaxState(2);
                    }
                    setLoading(false);
                  }}
                >
                  <h1 className="text-xl font-bold">Create a Team</h1>

                  <Input
                    onChange={(e) => nameHandler(e.target.value)}
                    type="text"
                    placeholder="Team Name"
                    className={`text-center border rounded p-2 text-white ${
                      isNameAvailable ? 'border-green-500' : 'border-red-600'
                    }`}
                    name="teamname"
                    required
                  />
                  <Button
                    type="submit"
                    className={`flex items-center gap-2 ${
                      !isNameAvailable && 'cursor-not-allowed hover:bg-gray-400'
                    }`}
                    disabled={!isNameAvailable}
                  >
                    <UserRoundPlus size={16} />
                    Create Team
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="w-full p-5">
              <CardContent>
                <form
                  className="flex flex-col gap-2 text-center"
                  onSubmit={async (e) => {
                    setLoading(true);
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const res = await joinTeam(formData);
                    if (res.status === 'error') setError(res.message);
                    if (res.status === 'success') setMessage(res.message);
                    setLoading(false);
                  }}
                >
                  <h1 className="text-xl font-bold">Join a Team</h1>
                  <Input
                    onChange={(e) => setTeamId(e.target.value)}
                    value={teamId}
                    type="text"
                    className="border rounded p-2"
                    placeholder="Team ID"
                    name="teamid"
                    required
                  />
                  <Button type="submit" className="flex items-center gap-2">
                    <Users size={16} />
                    Join Team
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
