"use client"

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  AudioLines,
  BookOpen,
  Cpu,
  Globe,
  Mic,
  Paperclip,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AIModelsOptions } from "@/services/Shared";
import { useState } from "react";
import { supabase } from "@/services/Supabase";
import { useUser } from "@clerk/nextjs";

export default function ChatInputBox() {
  const { user } = useUser();
  const [userSearchInput, setUserSearchInput] = useState("");
  const [userSearchInputType, setUserSearchInputType] = useState("search");
  const [loading, setLoading] = useState(false);
  
  const onSearchQuery = async () => {
    setLoading(true);
    const {data} = await supabase.from('library').insert({
      searchInput: userSearchInput,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      type: userSearchInputType
    }).select();
    setLoading(false);
    console.log(data![0]);
  };
  return (
    <div className="flex flex-col h-screen justify-center items-center w-full">
      <Image
        src={"/logo.png"}
        alt="divrec"
        width={260}
        height={250}
        className="m-10"
      />
      <div className="p-2 w-full max-w-2xl border border-primary/50 rounded-2xl">
        <div className="flex justify-between items-end">
          <Tabs defaultValue="search" className="w-[400px]">
            <TabsContent value="search">
              <input
                type="text"
                placeholder="Search Anything..."
                className="w-full p-4 outline-none text-primary"
                onChange={(e)=>{
                  setUserSearchInput(e.target.value)
                }}
              />
            </TabsContent>
            <TabsContent value="research">
              <input
                type="text"
                placeholder="Research Anything..."
                className="w-full p-4 outline-none text-primary"
                onChange={(e)=>{
                  setUserSearchInput(e.target.value)
                }}
              />
            </TabsContent>
            <TabsList className="bg-primary">
              <TabsTrigger value="search" className="focus" onClick={() => setUserSearchInput("search")}>
                <Search />
                Search
              </TabsTrigger>
              <TabsTrigger value="research" onClick={() => setUserSearchInputType("research")}>
                <BookOpen />
                Research
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex gap-4 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant={"ghost"}>
                  <Cpu className="text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-secondary p-2">
                {AIModelsOptions.map((model, index) => (
                  <DropdownMenuItem key={index}>
                    <div>
                      <h2 className="text-primary text-md font-bold">
                        {model.name}
                      </h2>
                      <p className="text-gray-600">{model.desc}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant={"ghost"}>
              <Globe className="text-primary" />
            </Button>
            <Button variant={"ghost"}>
              <Paperclip className="text-primary" />
            </Button>
            <Button variant={"ghost"}>
              <Mic className="text-primary" />
            </Button>
            <Button disabled={loading || !userSearchInput} onClick={() => onSearchQuery()}>
              {!userSearchInput ? (
                <AudioLines className={loading ? "opacity-50" : ""} />
              ) : (
                <ArrowRight className={loading ? "opacity-50" : ""} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
