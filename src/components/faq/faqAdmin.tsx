'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from '@/src/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { FaQuestionCircle } from 'react-icons/fa';
import { getAllFaqs, deleteFaq, answerFaq } from '@/src/server/actions';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { IoTrashBin } from 'react-icons/io5';

export default function FaqAdmin() {
  const [faqData, setFaqData] = useState<
    {
      id: number;
      question: string;
      answer: string;
      published: boolean;
    }[]
  >([]);
  const [answer, setAnswer] = useState('');
  useEffect(() => {
    getAllFaqs().then((data) => {
      setFaqData(data);
    });
  }, []);
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <FaQuestionCircle size={25} className="text-white" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Answer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faqData.map((faq, index) => {
                  if (!faq.published) {
                    return (
                      <TableRow key={index} className="text-black">
                        <TableCell>{faq.question}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger>Answer</DialogTrigger>
                            <DialogContent>
                              <DialogTitle className="text-black">
                                {faq.question}
                              </DialogTitle>
                              <input
                                type="text"
                                className="text-black p-2 rounded-lg"
                                placeholder="Answer this question"
                                value={answer}
                                onChange={(e) => {
                                  setAnswer(e.target.value);
                                }}
                              />
                              <button
                                className="bg-[#020817] text-white p-2 rounded-lg"
                                onClick={async () => {
                                  try {
                                    if (answer) {
                                      await answerFaq(faq.id, answer);
                                      toast.success('Answered', {
                                        position: 'bottom-center',
                                      });

                                      setAnswer('');
                                      getAllFaqs().then((data) => {
                                        setFaqData(data);
                                      });
                                    } else {
                                      toast.error('Answer cannot be empty', {
                                        position: 'bottom-center',
                                      });
                                    }
                                  } catch (e) {
                                    toast.error('Failed to answer', {
                                      position: 'bottom-center',
                                    });
                                  }
                                }}
                              >
                                Submit
                              </button>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                        <TableCell>
                          <span
                            onClick={() => {
                              try {
                                deleteFaq(faq.id).then(() => {
                                  setFaqData((prev) => {
                                    return prev.filter(
                                      (item) => item.id !== faq.id
                                    );
                                  });
                                });
                                toast.success('FAQ Deleted');
                              } catch (e) {
                                toast.error('Error deleting FAQ');
                              }
                            }}
                            className="cursor-pointer"
                          >
                            <IoTrashBin />
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
