'use client';
import QnaAccordion from './qnaAccordion';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { addFaq, getAllFaqs } from '@/src/server/actions';
import { useState, useEffect } from 'react';
import { SectionHeading } from '../ui/sectionHeading';
import { toast } from 'sonner';
import { Category } from '@prisma/client';
import { Button } from '../ui/button';

export const FAQ = () => {
  const [faq, setFaq] = useState<{
    question: string;
    category: 'GENERAL' | 'FOOD' | 'STAY' | 'TRAVEL';
  }>({
    question: '',
    category: 'GENERAL',
  });

  const [faqs, setFaqs] = useState<
    {
      id: number;
      question: string;
      answer: string;
      category: 'GENERAL' | 'FOOD' | 'STAY' | 'TRAVEL';
      published: boolean;
    }[]
  >([]);
  useEffect(() => {
    getAllFaqs().then((res) => {
      setFaqs(res);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center md:py-12 py-6 gap-y-4 ">
        <SectionHeading title="FAQ" classname="text-5xl md:text-6xl xl:text-7xl" />
        <div className="flex flex-col w-full justify-center items-center pt-2 pb-6 space-y-6">
          <Tabs
            defaultValue="GENERAL"
            className=" justify-center items-center flex flex-col"
          >
            <TabsList className="md:scale-150 scale-[120%] mb-5">
              <TabsTrigger value="GENERAL">General</TabsTrigger>
              <TabsTrigger value="FOOD">Food</TabsTrigger>
              <TabsTrigger value="STAY">Stay</TabsTrigger>
              <TabsTrigger value="TRAVEL">Travel</TabsTrigger>
            </TabsList>
            <TabsContent value="GENERAL">
              <QnaAccordion
                faqs={faqs.filter(
                  (faq) => faq.category === 'GENERAL' && faq.published
                )}
              />
            </TabsContent>
            <TabsContent value="FOOD">
              <QnaAccordion
                faqs={faqs.filter(
                  (faq) => faq.category === 'FOOD' && faq.published
                )}
              />
            </TabsContent>
            <TabsContent value="STAY">
              <QnaAccordion
                faqs={faqs.filter(
                  (faq) => faq.category === 'STAY' && faq.published
                )}
              />
            </TabsContent>
            <TabsContent value="TRAVEL">
              <QnaAccordion
                faqs={faqs.filter(
                  (faq) => faq.category === 'TRAVEL' && faq.published
                )}
              />
            </TabsContent>
          </Tabs>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="font-semibold">Drop your question</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogTitle>Submit your question</DialogTitle>
              <div className="flex flex-col gap-2 ">
                <input
                  type="text"
                  className="bg-[#020817] border-2 rounded-lg p-2"
                  value={faq.question}
                  placeholder="Your Quesiton"
                  onChange={(e) => {
                    setFaq({ ...faq, question: e.target.value });
                  }}
                />

                <select
                  value={faq.category}
                  defaultValue={'General'}
                  onChange={(e) => {
                    setFaq({ ...faq, category: e.target.value as Category });
                  }}
                  className="bg-[#020817] border-2 rounded-lg p-2"
                >
                  <option value="GENERAL">General</option>
                  <option value="STAY">Stay</option>
                  <option value="TRAVEL">Travel</option>
                  <option value="FOOD">Food</option>
                </select>

                <Button
                  onClick={() => {
                    try {
                      if (faq.question) {
                        addFaq(faq);
                        toast.success('Question submitted successfully!', {
                          position: 'bottom-center',
                        });
                        setFaq({ ...faq, question: '' });
                      } else {
                        toast.error('Please enter a question', {
                          position: 'bottom-center',
                        });
                      }
                    } catch (e) {
                      toast.error('Error submitting question', {
                        position: 'bottom-center',
                      });
                    }
                  }}
                  className="font-semibold"
                >
                  Submit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};
