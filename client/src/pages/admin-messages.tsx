import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { 
  MessageCircle, Send, User, LogOut, Package, ImageIcon, 
  Mail, Phone, Calendar, Clock, CheckCircle, Circle
} from "lucide-react";

export default function AdminMessagesPage() {
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();

  useEffect(() => {
    document.title = "Messages & Contacts - JK Trout Feed Admin";
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminUser");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/secure-portal-jk2024");
  };

  // Fetch all contacts
  const { data: contacts, isLoading: contactsLoading } = useQuery({
    queryKey: ['/api/contacts'],
    queryFn: () => fetch('/api/contacts').then(res => res.json())
  });

  // Fetch messages for selected contact
  const { data: contactWithMessages, isLoading: messagesLoading } = useQuery({
    queryKey: ['/api/contacts', selectedContact?.id, 'messages'],
    queryFn: () => fetch(`/api/contacts/${selectedContact.id}/messages`).then(res => res.json()),
    enabled: !!selectedContact?.id
  });

  const sendMessageMutation = useMutation({
    mutationFn: (messageData: any) => apiRequest("POST", "/api/messages", messageData),
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Your reply has been sent successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/contacts', selectedContact?.id, 'messages'] });
      setNewMessage("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message.",
        variant: "destructive",
      });
    }
  });

  const markAsReadMutation = useMutation({
    mutationFn: (messageId: number) => apiRequest("PUT", `/api/messages/${messageId}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts', selectedContact?.id, 'messages'] });
    }
  });

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    sendMessageMutation.mutate({
      contactId: selectedContact.id,
      message: newMessage,
      fromAdmin: true
    });
  };

  const handleContactSelect = (contact: any) => {
    setSelectedContact(contact);
    // Mark unread messages as read when opening conversation
    if (contactWithMessages?.messages) {
      contactWithMessages.messages
        .filter((msg: any) => !msg.isRead && !msg.fromAdmin)
        .forEach((msg: any) => markAsReadMutation.mutate(msg.id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredContacts = contacts?.filter((contact: any) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const stats = {
    totalContacts: contacts?.length || 0,
    unreadMessages: 0 // This would be calculated from message data
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Messages & Contacts</h1>
              <p className="text-xl text-blue-200">Manage customer communications</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-blue-200">
                <User className="w-4 h-4 mr-2" />
                <span>Welcome, {localStorage.getItem("adminUser")}</span>
              </div>
              <Button 
                onClick={() => navigate("/admin/dashboard")}
                variant="outline"
                className="bg-white text-primary hover:bg-gray-100"
              >
                Dashboard
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="bg-red-500 text-white hover:bg-red-600 border-red-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[800px]">
          {/* Contacts Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contacts ({stats.totalContacts})
                </CardTitle>
                <Input
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-2"
                />
              </CardHeader>
              <CardContent className="p-0 overflow-y-auto h-[calc(100%-120px)]">
                {contactsLoading ? (
                  <div className="p-4 text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-sm text-neutral">Loading contacts...</p>
                  </div>
                ) : filteredContacts.length > 0 ? (
                  <div className="divide-y">
                    {filteredContacts.map((contact: any) => (
                      <div
                        key={contact.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedContact?.id === contact.id ? 'bg-blue-50 border-r-4 border-primary' : ''
                        }`}
                        onClick={() => handleContactSelect(contact)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                            <p className="text-sm text-gray-600 truncate">{contact.email}</p>
                            <p className="text-sm text-gray-500 mt-1 truncate">{contact.subject}</p>
                            <div className="flex items-center mt-2 text-xs text-gray-400">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(contact.createdAt)}
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                            {contact.phone && (
                              <Phone className="w-3 h-3 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-neutral">No contacts found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Messages Area */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              {selectedContact ? (
                <>
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center">
                          <User className="w-5 h-5 mr-2" />
                          {selectedContact.name}
                        </CardTitle>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {selectedContact.email}
                          </div>
                          {selectedContact.phone && (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              {selectedContact.phone}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          <strong>Subject:</strong> {selectedContact.subject}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {/* Messages Display */}
                  <CardContent className="flex-1 overflow-y-auto h-[calc(100%-200px)] p-4">
                    {messagesLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-2 text-sm text-neutral">Loading messages...</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Original Contact Message */}
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-gray-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="bg-gray-100 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900">
                                  {selectedContact.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {formatDate(selectedContact.createdAt)}
                                </span>
                              </div>
                              <p className="text-gray-700">{selectedContact.message}</p>
                            </div>
                          </div>
                        </div>

                        {/* Additional Messages */}
                        {contactWithMessages?.messages?.map((message: any) => (
                          <div
                            key={message.id}
                            className={`flex items-start space-x-3 ${
                              message.fromAdmin ? 'flex-row-reverse space-x-reverse' : ''
                            }`}
                          >
                            <div className="flex-shrink-0">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                message.fromAdmin ? 'bg-primary text-white' : 'bg-gray-300'
                              }`}>
                                {message.fromAdmin ? (
                                  <User className="w-4 h-4" />
                                ) : (
                                  <User className="w-4 h-4 text-gray-600" />
                                )}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className={`rounded-lg p-3 ${
                                message.fromAdmin ? 'bg-primary text-white' : 'bg-gray-100'
                              }`}>
                                <div className="flex items-center justify-between mb-2">
                                  <span className={`text-sm font-medium ${
                                    message.fromAdmin ? 'text-white' : 'text-gray-900'
                                  }`}>
                                    {message.fromAdmin ? 'Admin' : selectedContact.name}
                                  </span>
                                  <span className={`text-xs ${
                                    message.fromAdmin ? 'text-blue-100' : 'text-gray-500'
                                  }`}>
                                    {formatDate(message.createdAt)}
                                  </span>
                                </div>
                                <p className={message.fromAdmin ? 'text-white' : 'text-gray-700'}>
                                  {message.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your reply..."
                        rows={2}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || sendMessageMutation.isPending}
                        className="self-end"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select a Contact
                    </h3>
                    <p className="text-gray-500">
                      Choose a contact from the sidebar to view and reply to their messages
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}