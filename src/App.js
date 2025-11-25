import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Circle, CheckCircle2, X, Edit2, Trash2, Check, Search, Filter, LogOut } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TutorialModal from './components/TutorialModal';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

function Auth({ onAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onAuth(data.user);
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (data.user) {
          alert('Check your email to confirm your account!');
          setIsLogin(true);
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-8 text-center">
          MindCache
        </h1>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-orange-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full py-3 px-4 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </button>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-4 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</Link>
          <span>•</span>
          <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
function UnifiedNotesApp() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterTag, setFilterTag] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [selectedAutocomplete, setSelectedAutocomplete] = useState(0);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [activePane, setActivePane] = useState('notes');
  const [loading, setLoading] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [customTagColors, setCustomTagColors] = useState({});
  const [editingTagColor, setEditingTagColor] = useState(null); // Will store unique key like "tagName-keyPrefix-index"
  const inputRef = useRef(null);

  const tagColors = [
    'text-blue-600 bg-blue-50 border-blue-200',
    'text-green-600 bg-green-50 border-green-200',
    'text-purple-600 bg-purple-50 border-purple-200',
    'text-orange-600 bg-orange-50 border-orange-200',
    'text-pink-600 bg-pink-50 border-pink-200',
    'text-indigo-600 bg-indigo-50 border-indigo-200',
    'text-teal-600 bg-teal-50 border-teal-200',
    'text-red-600 bg-red-50 border-red-200',
    'text-amber-600 bg-amber-50 border-amber-200',
    'text-cyan-600 bg-cyan-50 border-cyan-200'
  ];

  const getTagColor = (tag) => {
    // Check if there's a custom color set for this tag
    if (customTagColors[tag] !== undefined) {
      return tagColors[customTagColors[tag]];
    }
    // Otherwise use the hash-based color
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    return tagColors[Math.abs(hash) % tagColors.length];
  };

  // Auth check
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch notes and subscribe to changes
  useEffect(() => {
    if (user) {
      fetchNotes();
      
      // Load custom tag colors from Supabase user metadata
      if (user.user_metadata?.tag_colors) {
        setCustomTagColors(user.user_metadata.tag_colors);
      }

      // Check if user has seen tutorial
      const hasSeenTutorial = user.user_metadata?.has_seen_tutorial;
      if (!hasSeenTutorial) {
        setShowTutorial(true);
      }
      
      const channel = supabase
        .channel('notes-changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'notes', filter: `user_id=eq.${user.id}` },
          () => fetchNotes()
        )
        .subscribe();

      return () => supabase.removeChannel(channel);
    }
  }, [user]);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching notes:', error);
    } else {
      const formattedNotes = data.map(note => ({
        id: note.id,
        text: note.text,
        type: note.type,
        status: note.status,
        tags: note.tags ? note.tags.split(',').filter(t => t) : [],
        dueDate: note.due_date,
        timestamp: note.created_at
      }));
      setItems(formattedNotes);
    }
  };

  const addNote = async () => {
    const parsed = parseItem(currentInput);
    
    const { error } = await supabase
      .from('notes')
      .insert([{
        user_id: user.id,
        text: parsed.text,
        type: parsed.type,
        status: parsed.status,
        tags: parsed.tags.join(','),
        due_date: parsed.dueDate
      }]);
    
    if (error) {
      console.error('Error adding note:', error);
    } else {
      setCurrentInput('');
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
      fetchNotes();
    }
  };

  const toggleTodo = async (id) => {
    const item = items.find(i => i.id === id);
    if (!item || item.type !== 'todo') return;

    const newStatus = item.status === 'completed' ? 'incomplete' : 'completed';
    
    const { error } = await supabase
      .from('notes')
      .update({ status: newStatus })
      .eq('id', id);
    
    if (error) {
      console.error('Error toggling todo:', error);
    } else {
      fetchNotes();
    }
  };

  const deleteItem = async (id) => {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting note:', error);
    } else {
      if (editingItemId === id) {
        setEditingItemId(null);
        setEditingText('');
      }
      fetchNotes();
    }
  };

  const saveEditedItem = async (id) => {
    const parsed = parseItem(editingText);
    
    const { error } = await supabase
      .from('notes')
      .update({
        text: parsed.text,
        type: parsed.type,
        status: parsed.status,
        tags: parsed.tags.join(','),
        due_date: parsed.dueDate
      })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating note:', error);
    } else {
      setEditingItemId(null);
      setEditingText('');
      fetchNotes();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setItems([]);
  };

  const handleCloseTutorial = async () => {
    setShowTutorial(false);
    // Mark tutorial as seen in user metadata
    await supabase.auth.updateUser({
      data: { has_seen_tutorial: true }
    });
  };

  const setCustomTagColor = async (tag, colorIndex) => {
    const newColors = { ...customTagColors, [tag]: colorIndex };
    setCustomTagColors(newColors);
    // Save to Supabase user metadata for cross-device sync
    const { error } = await supabase.auth.updateUser({
      data: { tag_colors: newColors }
    });
    if (error) {
      console.error('Error saving tag colors:', error);
    }
  };
  const parseItem = (text) => {
    const isTodo = text.trim().startsWith('[]') || text.trim().startsWith('[x]');
    const isCompleted = text.trim().startsWith('[x]');
    
    let displayText = text;
    if (text.trim().startsWith('[]')) {
      displayText = text.replace('[]', '').trim();
    } else if (text.trim().startsWith('[x]')) {
      displayText = text.replace('[x]', '').trim();
    }
    
    const tagRegex = /#(\w+)/g;
    const tags = [...displayText.matchAll(tagRegex)].map(match => match[1]);
    
    const dueDateRegex = /@(\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{1,2}[-/]\d{1,2})/;
    const dueDateMatch = displayText.match(dueDateRegex);
    let dueDate = null;
    
    if (dueDateMatch) {
      const dateStr = dueDateMatch[1];
      const parts = dateStr.split(/[-/]/);
      
      if (parts.length === 2) {
        const currentYear = new Date().getFullYear();
        const month = parts[0].padStart(2, '0');
        const day = parts[1].padStart(2, '0');
        dueDate = `${currentYear}-${month}-${day}`;
      } else if (parts.length === 3) {
        const month = parts[0].padStart(2, '0');
        const day = parts[1].padStart(2, '0');
        let year = parts[2];
        if (year.length === 2) {
          const currentYear = new Date().getFullYear();
          const currentCentury = Math.floor(currentYear / 100) * 100;
          year = currentCentury + parseInt(year);
        }
        dueDate = `${year}-${month}-${day}`;
      }
    }
    
    return {
      text: displayText,
      type: isTodo ? 'todo' : 'note',
      status: isTodo ? (isCompleted ? 'completed' : 'incomplete') : null,
      tags: tags,
      dueDate: dueDate
    };
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCurrentInput(value);

    const cursorPos = e.target.selectionStart;
    const textBeforeCursor = value.slice(0, cursorPos);
    const hashIndex = textBeforeCursor.lastIndexOf('#');
    
    if (hashIndex !== -1) {
      const textAfterHash = textBeforeCursor.slice(hashIndex + 1);
      if (!textAfterHash.includes(' ') && textAfterHash.length > 0) {
        const allTags = getAllTags();
        const matches = allTags.filter(tag => 
          tag.toLowerCase().startsWith(textAfterHash.toLowerCase())
        );
        if (matches.length > 0) {
          setAutocompleteOptions(matches);
          setShowAutocomplete(true);
          setSelectedAutocomplete(0);
        } else {
          setShowAutocomplete(false);
        }
      } else if (textAfterHash.length === 0) {
        setAutocompleteOptions(getAllTags());
        setShowAutocomplete(true);
        setSelectedAutocomplete(0);
      } else {
        setShowAutocomplete(false);
      }
    } else {
      setShowAutocomplete(false);
    }
  };

  const insertTag = (tag) => {
    const cursorPos = inputRef.current.selectionStart;
    const textBeforeCursor = currentInput.slice(0, cursorPos);
    const textAfterCursor = currentInput.slice(cursorPos);
    const hashIndex = textBeforeCursor.lastIndexOf('#');
    
    const newText = textBeforeCursor.slice(0, hashIndex + 1) + tag + ' ' + textAfterCursor;
    setCurrentInput(newText);
    setShowAutocomplete(false);
    
    setTimeout(() => {
      const newCursorPos = hashIndex + tag.length + 2;
      inputRef.current.focus();
      inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (showAutocomplete) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedAutocomplete(prev => 
          prev < autocompleteOptions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedAutocomplete(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Tab' || e.key === 'Enter') {
        if (autocompleteOptions.length > 0) {
          e.preventDefault();
          insertTag(autocompleteOptions[selectedAutocomplete]);
          return;
        }
      } else if (e.key === 'Escape') {
        setShowAutocomplete(false);
        return;
      }
    }
    
    if (e.key === 'Enter' && !e.shiftKey && !showAutocomplete && currentInput.trim()) {
      e.preventDefault();
      addNote();
    }
  };

  const startEditingItem = (item) => {
    setEditingItemId(item.id);
    // Reconstruct the full text with brackets for todos
    let fullText = item.text;
    if (item.type === 'todo') {
      const bracket = item.status === 'completed' ? '[x]' : '[]';
      fullText = `${bracket} ${item.text}`;
    }
    setEditingText(fullText);
  };

  const cancelEditingItem = () => {
    setEditingItemId(null);
    setEditingText('');
  };

  const clearFilters = () => {
    setFilterType('all');
    setFilterTag('');
    setFilterStatus('all');
    setSortBy('recent');
  };

  const getAllTags = () => {
    const tagSet = new Set();
    items.forEach(item => {
      item.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  };

  const getFilteredItems = () => {
    let filtered = items.filter(item => {
      if (filterType === 'notes' && item.type !== 'note') return false;
      if (filterType === 'todos' && item.type !== 'todo') return false;
      if (filterTag && !item.tags.includes(filterTag)) return false;
      if (filterStatus === 'completed' && item.status !== 'completed') return false;
      if (filterStatus === 'incomplete' && item.status !== 'incomplete') return false;
      return true;
    });

    if (sortBy === 'dueDate') {
      filtered = [...filtered].sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else {
      filtered = [...filtered].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    return filtered;
  };

  const autoResize = (el) => {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  };

  // Copy your entire renderItemText and processLine functions from your working App.js
  // These are the markdown/formatting functions - they're exactly the same
  const renderItemText = (item, pane = 'main') => {
    const lines = item.text.split('\n');
    const hasBullets = lines.some(line => line.trim().startsWith('- '));
    
    if (hasBullets) {
      return (
        <div>
          {lines.map((line, lineIndex) => {
            const trimmedLine = line.trim();
            
            if (trimmedLine.startsWith('- ')) {
              const bulletContent = trimmedLine.substring(2);
              return (
                <div key={`line-${lineIndex}`} className="flex items-start gap-2 ml-4 my-1">
                  <span className="text-gray-600 mt-0.5">•</span>
                  <span className="flex-1">{processLine(bulletContent, `${pane}-bullet-${lineIndex}`)}</span>
                </div>
              );
            } else if (trimmedLine) {
              return <div key={`line-${lineIndex}`} className="my-1">{processLine(trimmedLine, `${pane}-line-${lineIndex}`)}</div>;
            } else {
              return <div key={`line-${lineIndex}`} className="h-4"></div>;
            }
          })}
        </div>
      );
    } else {
      if (lines.length > 1) {
        return (
          <div>
            {lines.map((line, lineIndex) => {
              if (line.trim()) {
                return <div key={`line-${lineIndex}`}>{processLine(line, `${pane}-line-${lineIndex}`)}</div>;
              } else {
                return <div key={`line-${lineIndex}`} className="h-4"></div>;
              }
            })}
          </div>
        );
      } else {
        return processLine(item.text, `${pane}-text`);
      }
    }
  };

  const processLine = (text, keyPrefix) => {
    const parts = [];
    let lastIndex = 0;
    const tagRegex = /#(\w+)/g;
    const dueDateRegex = /@(\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{1,2}[-/]\d{1,2})/g;
    
    const combinedMatches = [];
    let match;
    
    while ((match = tagRegex.exec(text)) !== null) {
      combinedMatches.push({ type: 'tag', match, index: match.index });
    }
    
    while ((match = dueDateRegex.exec(text)) !== null) {
      combinedMatches.push({ type: 'date', match, index: match.index });
    }
    
    combinedMatches.sort((a, b) => a.index - b.index);

    const processMarkdown = (text, prefix = '') => {
      const segments = [];
      let segmentIndex = 0;
      const boldRegex = /(\*\*|__)(.*?)\1/g;
      let lastBoldIndex = 0;
      let boldMatch;
      
      while ((boldMatch = boldRegex.exec(text)) !== null) {
        if (boldMatch.index > lastBoldIndex) {
          const beforeText = text.substring(lastBoldIndex, boldMatch.index);
          segments.push(...processItalicAndUnderline(beforeText, `${prefix}-s${segmentIndex++}`));
        }
        segments.push(
          <strong key={`${prefix}-b${segmentIndex++}`} className="font-bold">
            {processItalicAndUnderline(boldMatch[2], `${prefix}-bi${segmentIndex}`)}
          </strong>
        );
        lastBoldIndex = boldMatch.index + boldMatch[0].length;
      }
      
      if (lastBoldIndex < text.length) {
        segments.push(...processItalicAndUnderline(text.substring(lastBoldIndex), `${prefix}-e${segmentIndex++}`));
      }
      
      return segments;
    };
    
    const processItalicAndUnderline = (text, prefix) => {
      const segments = [];
      const formatRegex = /(\*|_)([^*_]+?)\1/g;
      let lastIndex = 0;
      let match;
      
      while ((match = formatRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          segments.push(...processUrls(text.substring(lastIndex, match.index), `${prefix}-txt-${lastIndex}`));
        }
        
        if (match[1] === '*') {
          segments.push(
            <em key={`${prefix}-i${match.index}`} className="italic">
              {match[2]}
            </em>
          );
        } else if (match[1] === '_') {
          segments.push(
            <span key={`${prefix}-u${match.index}`} className="underline">
              {match[2]}
            </span>
          );
        }
        
        lastIndex = match.index + match[0].length;
      }
      
      if (lastIndex < text.length) {
        segments.push(...processUrls(text.substring(lastIndex), `${prefix}-end-${lastIndex}`));
      }
      
      return segments.length > 0 ? segments : processUrls(text, prefix);
    };
    
    const processUrls = (text, prefix) => {
      const segments = [];
      const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,}[^\s]*)/g;
      let lastIndex = 0;
      let match;
      
      while ((match = urlRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          segments.push(text.substring(lastIndex, match.index));
        }
        
        let url = match[0];
        let href = url;
        
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          href = 'https://' + url;
        }
        
        segments.push(
          <a 
            key={`${prefix}-url-${match.index}`} 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
            onClick={(e) => e.stopPropagation()}
          >
            {url}
          </a>
        );
        
        lastIndex = match.index + match[0].length;
      }
      
      if (lastIndex < text.length) {
        segments.push(text.substring(lastIndex));
      }
      
      return segments.length > 0 ? segments : [text];
    };

    combinedMatches.forEach((matchItem) => {
      if (matchItem.index > lastIndex) {
        const textSegment = matchItem.match.input.substring(lastIndex, matchItem.index);
        parts.push(...processMarkdown(textSegment, `${keyPrefix}-t-${lastIndex}`));
      }
      
      if (matchItem.type === 'tag') {
        const tagColor = getTagColor(matchItem.match[1]);
        const tagName = matchItem.match[1];
        const uniqueTagKey = `${keyPrefix}-tag-${matchItem.index}`;
        parts.push(
          <span 
            key={uniqueTagKey} 
            className={`${tagColor} px-2.5 py-1 rounded-lg font-semibold text-sm border inline-block mx-1 cursor-pointer hover:opacity-80 transition-opacity relative group`}
            onContextMenu={(e) => {
              e.preventDefault();
              setEditingTagColor(editingTagColor === uniqueTagKey ? null : uniqueTagKey);
            }}
            onClick={(e) => {
              if (e.shiftKey) {
                e.preventDefault();
                setEditingTagColor(editingTagColor === uniqueTagKey ? null : uniqueTagKey);
              }
            }}
            title="Right-click or Shift+Click to change color"
          >
            #{tagName}
            {editingTagColor === uniqueTagKey && (
              <div className="absolute z-50 mt-1 p-2 bg-white rounded-lg shadow-2xl border-2 border-slate-300 flex gap-1 left-0 top-full">
                {tagColors.map((color, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCustomTagColor(tagName, index);
                      setEditingTagColor(null);
                    }}
                    className={`${color} w-7 h-7 rounded border-2 hover:scale-110 transition-transform`}
                    title={`Color ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </span>
        );
      } else if (matchItem.type === 'date') {
        const dateStr = matchItem.match[1];
        const dateParts = dateStr.split(/[-/]/);
        let fullDate;
        
        if (dateParts.length === 2) {
          const currentYear = new Date().getFullYear();
          const month = dateParts[0].padStart(2, '0');
          const day = dateParts[1].padStart(2, '0');
          fullDate = `${currentYear}-${month}-${day}`;
        } else {
          const month = dateParts[0].padStart(2, '0');
          const day = dateParts[1].padStart(2, '0');
          let year = dateParts[2];
          if (year.length === 2) {
            const currentYear = new Date().getFullYear();
            const currentCentury = Math.floor(currentYear / 100) * 100;
            year = currentCentury + parseInt(year);
          }
          fullDate = `${year}-${month}-${day}`;
        }
        
        const dueDate = new Date(fullDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const isOverdue = dueDate < today;
        
        parts.push(
          <span key={`${keyPrefix}-date-${matchItem.index}`} className={`${isOverdue ? 'text-red-700 bg-red-100 border-red-300' : 'text-gray-700 bg-gray-100 border-gray-300'} px-2.5 py-1 rounded-lg font-semibold text-sm border inline-block mx-1`}>
            @{matchItem.match[1]}
          </span>
        );
      }
      
      lastIndex = matchItem.index + matchItem.match[0].length;
    });

    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      parts.push(...processMarkdown(remainingText, `${keyPrefix}-end-${lastIndex}`));
    }

    return parts;
  };

  // Loading/Auth check
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-orange-50">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth onAuth={setUser} />;
  }

  // Part 4 will be the return statement with all the JSX
  return ( <div className="flex flex-col h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex flex-1 overflow-hidden">
      <div className="md:hidden fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setActivePane('notes')}
          className={`px-3 py-1.5 text-sm rounded-lg shadow-lg font-medium ${activePane === 'notes' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200'}`}
        >
          Notes
        </button>
        <button
          onClick={() => setActivePane('filter')}
          className={`p-1.5 rounded-lg shadow-lg ${activePane === 'filter' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200'}`}
        >
          <Filter size={18} />
        </button>
      </div>

      <div className={`w-full md:w-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-r border-slate-200 dark:border-gray-700 flex flex-col shadow-xl ${activePane === 'notes' ? 'block' : 'hidden md:flex'}`}>
        <div className="p-4 md:p-6 border-b border-slate-200 dark:border-gray-700 bg-gradient-to-r from-blue-50/50 to-slate-50/50 dark:from-gray-800/50 dark:to-gray-900/50">
          <div className="flex items-center mb-2">
            <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">MindCache</h1>
          </div>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span className="font-mono bg-blue-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-400 px-1.5 py-0.5 rounded text-xs">[]</span> todos • <span className="font-mono bg-blue-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-400 px-1.5 py-0.5 rounded text-xs">#tags</span> • <span className="font-mono bg-blue-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-400 px-1.5 py-0.5 rounded text-xs">@M/D</span> • <span className="font-mono bg-blue-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-400 px-1.5 py-0.5 rounded text-xs">**bold**</span> • <span className="font-mono bg-blue-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-400 px-1.5 py-0.5 rounded text-xs">*italic*</span> • <span className="font-mono bg-blue-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-400 px-1.5 py-0.5 rounded text-xs">_underline_</span> • <span className="font-mono bg-blue-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-400 px-1.5 py-0.5 rounded text-xs">- bullets</span>
          </p>
          <div className="relative">
            <textarea
              ref={inputRef}
              value={currentInput}
              onChange={(e) => {
                handleInputChange(e);
                autoResize(e.target);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Write something..."
              rows={1}
              className="w-full px-4 py-3 text-gray-800 dark:text-gray-200 dark:text-gray-200 bg-white dark:bg-gray-700 border-2 border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm resize-none"
              style={{ minHeight: '48px', maxHeight: '200px' }}
            />
            {showAutocomplete && autocompleteOptions.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-slate-300 dark:border-gray-600 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                {autocompleteOptions.map((tag, index) => {
                  const tagColor = getTagColor(tag);
                  return (
                    <div
                      key={tag}
                      onClick={() => insertTag(tag)}
                      className={`px-4 py-2 cursor-pointer ${index === selectedAutocomplete ? 'bg-blue-50' : 'hover:bg-slate-50 dark:hover:bg-gray-700'}`}
                    >
                      <span className={`${tagColor} px-2.5 py-1 rounded-lg font-semibold text-sm border`}>
                        #{tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {items.length === 0 ? (
            <div className="text-center text-gray-400 mt-16">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-lg font-semibold text-gray-600 mb-2">No notes yet</p>
              <p className="text-sm text-gray-500">Start typing above</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {items.map(item => (
                <div key={item.id} className="flex items-start gap-3 p-3 hover:bg-slate-50 dark:hover:bg-gray-700 rounded-lg group border border-transparent hover:border-slate-200">
                  {item.type === 'todo' && (
                    <button onClick={() => toggleTodo(item.id)} className="mt-1 flex-shrink-0 hover:scale-110 transition-transform">
                      {item.status === 'completed' ? (
                        <CheckCircle2 size={22} className="text-green-500" strokeWidth={2.5} />
                      ) : (
                        <Circle size={22} className="text-red-500" strokeWidth={2.5} />
                      )}
                    </button>
                  )}
                  <div className="flex-1 min-w-0">
                    {editingItemId === item.id ? (
                      <textarea
                        value={editingText}
                        onChange={(e) => {
                          setEditingText(e.target.value);
                          autoResize(e.target);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            saveEditedItem(item.id);
                          } else if (e.key === 'Escape') {
                            cancelEditingItem();
                          }
                        }}
                        className="w-full px-4 py-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                        autoFocus
                        rows={1}
                        style={{ minHeight: '40px' }}
                      />
                    ) : (
                      <p className={`text-base leading-relaxed ${item.type === 'todo' ? 'text-red-600 font-medium' : 'text-gray-800 dark:text-gray-200'} ${item.status === 'completed' ? 'line-through opacity-40' : ''}`}>
                        {renderItemText(item, `left-${item.id}`)}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 flex-shrink-0">
                    {editingItemId === item.id ? (
                      <>
                        <button onClick={() => saveEditedItem(item.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                          <Check size={18} strokeWidth={2.5} />
                        </button>
                        <button onClick={cancelEditingItem} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                          <X size={18} strokeWidth={2.5} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEditingItem(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit2 size={18} strokeWidth={2.5} />
                        </button>
                        <button onClick={() => deleteItem(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 size={18} strokeWidth={2.5} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={`w-full md:w-1/2 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 flex flex-col ${activePane === 'filter' ? 'block' : 'hidden md:flex'}`}>
        <div className="p-4 md:p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-b border-slate-200 dark:border-gray-700 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="text-blue-600" size={20} strokeWidth={2.5} />
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">Filters</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-2">
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm">
                <option value="all">All</option>
                <option value="notes">Notes</option>
                <option value="todos">Todos</option>
              </select>
              
              <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm">
                <option value="">All Tags</option>
                {getAllTags().map(tag => (
                  <option key={tag} value={tag}>#{tag}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm">
                <option value="all">All Status</option>
                <option value="incomplete">Incomplete</option>
                <option value="completed">Completed</option>
              </select>
              
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm">
                <option value="recent">Most Recent</option>
                <option value="dueDate">Due Date</option>
              </select>
            </div>

            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-slate-300 dark:border-gray-600 rounded-lg transition-all"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2 bg-white/70 px-3 py-1.5 rounded-full inline-flex">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-orange-600 rounded-full"></div>
            {getFilteredItems().length} of {items.length}
          </div>

          {getFilteredItems().length === 0 ? (
            <div className="text-center text-gray-400 mt-16">
              <Search size={48} className="mx-auto mb-4 opacity-40" />
              <p className="text-lg font-semibold text-gray-600">No matches</p>
            </div>
          ) : (
            <div className="space-y-3">
              {getFilteredItems().map(item => (
                <div key={item.id} className="flex items-start gap-3 p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                  {item.type === 'todo' && (
                    <button onClick={() => toggleTodo(item.id)} className="mt-1 flex-shrink-0 hover:scale-110 transition-transform">
                      {item.status === 'completed' ? (
                        <CheckCircle2 size={22} className="text-green-500" strokeWidth={2.5} />
                      ) : (
                        <Circle size={22} className="text-red-500" strokeWidth={2.5} />
                      )}
                    </button>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-base leading-relaxed ${item.type === 'todo' ? 'text-red-600 font-medium' : 'text-gray-800 dark:text-gray-200'} ${item.status === 'completed' ? 'line-through opacity-40' : ''}`}>
                      {renderItemText(item, `right-${item.id}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="bg-white dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">{user.email}</span>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-500">
        © 2025 MindCache. All rights reserved.
      </div>
    </div>

    {/* Tutorial Modal */}
    <TutorialModal isOpen={showTutorial} onClose={handleCloseTutorial} />
  </div>
  );
}
// Main App component with routing
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UnifiedNotesApp />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
    </Routes>
  );
}