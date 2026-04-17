import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Sparkles, 
  FlaskConical, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Activity, 
  HelpCircle, 
  Lightbulb,
  Utensils,
  Flame,
  Coffee,
  Layers
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState(1);

  // --- State for Section 2: Experiment ---
  // 1 = مكعب صلب (Block), 2 = قطع صغيرة (Chunks), 3 = مسحوق (Powder)
  const [particleSize, setParticleSize] = useState(1); 
  const [reactionProgress, setReactionProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && reactionProgress < 100) {
      interval = setInterval(() => {
        // Reaction rate depends heavily on surface area
        let rate = 1;
        if (particleSize === 1) rate = 0.8;      // Slowest
        else if (particleSize === 2) rate = 2.5; // Medium
        else if (particleSize === 3) rate = 6.0; // Fastest

        setReactionProgress((prev) => {
          const next = prev + rate;
          return next >= 100 ? 100 : next;
        });
        setTimeElapsed((prev) => prev + 0.1);
      }, 100);
    } else if (reactionProgress >= 100) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, reactionProgress, particleSize]);

  const handleStartExperiment = () => {
    if (reactionProgress >= 100) {
      setReactionProgress(0);
      setTimeElapsed(0);
    }
    setIsRunning(true);
  };

  const handleResetExperiment = () => {
    setIsRunning(false);
    setReactionProgress(0);
    setTimeElapsed(0);
  };

  const handleSizeChange = (size) => {
    setParticleSize(size);
    handleResetExperiment();
  };

  // --- State for Section 3: Quiz ---
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      question: "ماذا يحدث لسرعة التفاعل الكيميائي عند تفتيت المادة الصلبة إلى مسحوق؟",
      options: ["تقل سرعة التفاعل", "تزداد سرعة التفاعل", "لا تتأثر سرعة التفاعل", "يتوقف التفاعل تماماً"],
      answer: 1
    },
    {
      question: "لماذا يذوب السكر المطحون في الماء أسرع من مكعب السكر؟",
      options: ["لأن السكر المطحون أبرد", "لأن مساحة السطح المعرضة للماء أكبر", "لأن تركيز السكر المطحون أعلى", "لأن السكر المطحون يحتوي على طاقة أقل"],
      answer: 1
    },
    {
      question: "أي من التالي يمثل تطبيقاً لزيادة مساحة السطح لزيادة سرعة التفاعل؟",
      options: ["حفظ الطعام في الثلاجة", "إضافة الماء للتفاعل", "مضغ الطعام جيداً قبل بلعه", "استخدام أوعية زجاجية"],
      answer: 2
    }
  ];

  const handleAnswerSubmit = (index) => {
    if (selectedAnswer !== null) return; 
    
    setSelectedAnswer(index);
    const correct = index === questions[currentQuestion].answer;
    
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
  };

  // --- Render Helpers ---
  const getActiveColor = () => "text-emerald-400";
  const getActiveBg = () => "bg-emerald-500";

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 font-sans text-slate-200 p-4 md:p-8">
      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rise-up {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-150px) scale(1.5); opacity: 0; }
        }
        .reaction-bubble {
          animation: rise-up infinite ease-in;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .float-anim { animation: float-slow 3s infinite ease-in-out; }
      `}} />

      <header className="max-w-6xl mx-auto mb-8 text-center">
        <div className="flex justify-center mb-3">
          <div className="p-3 bg-emerald-900/30 rounded-2xl border border-emerald-500/30">
            <Layers className="w-10 h-10 text-emerald-400" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          أثر مساحة السطح على سرعة التفاعل
        </h1>
        <p className="text-slate-400 text-lg">لوحة تفاعلية توضح كيف يؤثر تقسيم المادة على سرعة تفاعلها الكيميائي</p>
      </header>

      <main className="max-w-6xl mx-auto bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-slate-800 bg-slate-950/50">
          {[
            { id: 1, title: 'التفسير العلمي', icon: <BookOpen className="w-5 h-5" /> },
            { id: 2, title: 'التجربة التفاعلية', icon: <Activity className="w-5 h-5" /> },
            { id: 3, title: 'اختبر معلوماتك', icon: <HelpCircle className="w-5 h-5" /> },
            { id: 4, title: 'تطبيقات حياتية', icon: <Lightbulb className="w-5 h-5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[150px] py-4 px-2 flex items-center justify-center gap-2 text-sm md:text-base font-semibold transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-slate-900 text-emerald-400 border-b-2 border-emerald-400 shadow-[inset_0_-2px_10px_rgba(52,211,153,0.1)]' 
                  : 'text-slate-500 hover:text-emerald-300 hover:bg-slate-800/50'
              }`}
            >
              {tab.icon}
              {tab.title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-10 min-h-[500px]">
          
          {/* Section 1: Explanation */}
          {activeTab === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold mb-6 text-emerald-400 flex items-center gap-2">
                <BookOpen className="w-6 h-6" /> كيف تؤثر مساحة السطح؟
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5 text-lg leading-relaxed text-slate-300">
                  <p>
                    تحدث التفاعلات الكيميائية عندما <strong>تتصادم</strong> جزيئات المواد المتفاعلة مع بعضها. في المواد الصلبة، التفاعل يحدث فقط على <strong>السطح الخارجي</strong> المعرض للمادة الأخرى.
                  </p>
                  <div className="bg-emerald-900/10 p-5 rounded-2xl border border-emerald-800/30 shadow-inner">
                    <h3 className="font-bold text-emerald-300 mb-3 flex items-center gap-2">
                      <Grid className="w-5 h-5"/> التفتيت يزيد المساحة
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-300">
                      <li>في <strong className="text-white">القطعة الكبيرة</strong>، الجزيئات الداخلية مخفية ولا تشارك في التفاعل.</li>
                      <li>عند <strong className="text-white">طحن المادة</strong> إلى مسحوق، تنكشف الجزيئات الداخلية.</li>
                      <li>تصبح مساحة السطح المعرضة للتفاعل <strong className="text-emerald-400">أكبر بكثير</strong>.</li>
                      <li>تزداد التصادمات، وبذلك <strong className="text-emerald-400">تزداد سرعة التفاعل</strong>.</li>
                    </ul>
                  </div>
                </div>

                {/* Visual Representation */}
                <div className="bg-slate-950 p-6 rounded-3xl flex flex-col justify-center items-center gap-8 border border-slate-800">
                  <h3 className="text-xl font-bold text-slate-200">الفرق في مساحة السطح</h3>
                  
                  <div className="flex flex-col gap-8 w-full justify-center items-center">
                    {/* Solid Block */}
                    <div className="flex items-center gap-6 w-full max-w-sm">
                      <div className="w-24 h-24 bg-slate-700 border-4 border-slate-500 rounded-lg flex items-center justify-center relative float-anim">
                        <span className="text-xs text-slate-300 text-center font-bold">جزيئات<br/>مخفية بالداخل</span>
                        {/* Arrows pointing to surface */}
                        <div className="absolute -left-4 top-1/2 w-3 h-1 bg-emerald-500"></div>
                        <div className="absolute -right-4 top-1/2 w-3 h-1 bg-emerald-500"></div>
                        <div className="absolute top-1/2 -left-6 text-emerald-500 text-sm">◀️</div>
                        <div className="absolute top-1/2 -right-6 text-emerald-500 text-sm">▶️</div>
                      </div>
                      <div className="text-sm text-slate-400">
                        <strong className="text-white text-lg block mb-1">قطعة واحدة صلبة</strong>
                        تفاعل بطيء (سطح خارجي فقط)
                      </div>
                    </div>

                    <div className="w-full h-px bg-slate-800"></div>

                    {/* Powder / Small chunks */}
                    <div className="flex items-center gap-6 w-full max-w-sm">
                      <div className="w-24 h-24 flex flex-wrap gap-1 justify-center items-center float-anim" style={{animationDelay: '1s'}}>
                        {[...Array(16)].map((_, i) => (
                          <div key={i} className="w-4 h-4 bg-emerald-600/80 border border-emerald-400 rounded-sm relative">
                            {/* Tiny arrows for every piece */}
                            {(i === 0 || i === 15) && <div className="absolute -left-2 top-1 w-1 h-1 bg-white rounded-full"></div>}
                          </div>
                        ))}
                      </div>
                      <div className="text-sm text-slate-400">
                        <strong className="text-emerald-400 text-lg block mb-1">مسحوق / قطع صغيرة</strong>
                        تفاعل سريع (جميع الجزيئات مكشوفة)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Experiment */}
          {activeTab === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold mb-2 text-emerald-400 flex items-center gap-2">
                <Activity className="w-6 h-6" /> مختبر المحاكاة: ذوبان الكالسيوم في الحمض
              </h2>
              <p className="text-slate-400 mb-8">اختر حجم قطع المادة المتفاعلة، ثم اضغط على زر البدء لترى كيف تؤثر مساحة السطح على سرعة اختفاء المادة وتصاعد الغاز.</p>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-1 bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col gap-6">
                  <h3 className="font-bold text-lg text-white mb-2">1. اختر شكل المادة:</h3>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => handleSizeChange(1)}
                      disabled={isRunning}
                      className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${particleSize === 1 ? 'bg-slate-800 border-slate-500 text-white' : 'border-slate-800 text-slate-500 hover:border-slate-600 disabled:opacity-50'}`}
                    >
                      <Box className="w-6 h-6" />
                      <div className="text-right">
                        <div className="font-bold">قطعة واحدة كبيرة</div>
                        <div className="text-xs opacity-70">مساحة سطح صغيرة</div>
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => handleSizeChange(2)}
                      disabled={isRunning}
                      className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${particleSize === 2 ? 'bg-indigo-900/40 border-indigo-500 text-indigo-300' : 'border-slate-800 text-slate-500 hover:border-slate-600 disabled:opacity-50'}`}
                    >
                      <Grid className="w-6 h-6" />
                      <div className="text-right">
                        <div className="font-bold">قطع صغيرة</div>
                        <div className="text-xs opacity-70">مساحة سطح متوسطة</div>
                      </div>
                    </button>

                    <button 
                      onClick={() => handleSizeChange(3)}
                      disabled={isRunning}
                      className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${particleSize === 3 ? 'bg-emerald-900/40 border-emerald-500 text-emerald-300' : 'border-slate-800 text-slate-500 hover:border-slate-600 disabled:opacity-50'}`}
                    >
                      <Sparkles className="w-6 h-6" />
                      <div className="text-right">
                        <div className="font-bold">مسحوق ناعم</div>
                        <div className="text-xs opacity-70">مساحة سطح كبيرة جداً</div>
                      </div>
                    </button>
                  </div>

                  <div className="mt-auto space-y-3 pt-4 border-t border-slate-800">
                    <button 
                      onClick={handleStartExperiment}
                      disabled={isRunning && reactionProgress < 100}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition"
                    >
                      <Play className="w-5 h-5" /> {reactionProgress >= 100 ? 'إعادة التجربة' : 'بدء التفاعل'}
                    </button>
                    <button 
                      onClick={handleResetExperiment}
                      className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl flex items-center justify-center gap-2 transition"
                    >
                      <RotateCcw className="w-5 h-5" /> إعادة الضبط
                    </button>
                  </div>
                </div>

                {/* Simulation Display */}
                <div className="lg:col-span-2 bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col items-center justify-center relative shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
                  
                  {/* Results Dashboard */}
                  <div className="w-full flex justify-between items-center mb-10 px-6 py-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="text-center">
                      <span className="block text-sm text-slate-500 mb-1">الزمن</span>
                      <span className="text-3xl font-mono font-bold text-emerald-400">{timeElapsed.toFixed(1)}s</span>
                    </div>
                    <div className="text-center w-1/2">
                      <span className="block text-sm text-slate-500 mb-2">نسبة التفاعل (الذوبان)</span>
                      <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-100"
                          style={{ width: `${reactionProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* The Beaker */}
                  <div className="relative w-56 h-64 border-4 border-t-0 border-slate-600/50 rounded-b-3xl bg-slate-800/20 overflow-hidden flex items-end justify-center pb-4 shadow-inner">
                    {/* Acid Liquid */}
                    <div className="absolute bottom-0 w-full bg-indigo-500/20 transition-all duration-300" style={{ height: '75%' }}></div>
                    
                    {/* Bubbles Generator */}
                    {isRunning && reactionProgress < 100 && (
                      <div className="absolute inset-0 w-full h-full pointer-events-none">
                        {[...Array(particleSize * 10)].map((_, i) => (
                          <div 
                            key={i} 
                            className="absolute bottom-10 bg-indigo-200/50 rounded-full reaction-bubble"
                            style={{
                              width: `${Math.random() * 6 + 4}px`,
                              height: `${Math.random() * 6 + 4}px`,
                              left: `${20 + Math.random() * 60}%`,
                              animationDuration: `${Math.random() * 1 + (0.5 / particleSize)}s`,
                              animationDelay: `${Math.random() * 0.5}s`
                            }}
                          ></div>
                        ))}
                      </div>
                    )}

                    {/* The Solid Particles */}
                    {reactionProgress < 100 && (
                      <div 
                        className="relative z-10 transition-all duration-100 flex flex-wrap justify-center items-center"
                        style={{ 
                          width: '100px',
                          opacity: 1 - (reactionProgress / 100),
                          transform: `scale(${1 - (reactionProgress / 200)})` 
                        }}
                      >
                        {particleSize === 1 && (
                          <div className="w-16 h-16 bg-slate-300 rounded-sm border-2 border-slate-400 shadow-lg"></div>
                        )}
                        {particleSize === 2 && (
                          <div className="grid grid-cols-2 gap-2">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="w-7 h-7 bg-indigo-300 rounded-sm border border-indigo-400 shadow-sm float-anim" style={{animationDelay: `${i*0.2}s`}}></div>
                            ))}
                          </div>
                        )}
                        {particleSize === 3 && (
                          <div className="flex flex-wrap gap-1 w-full justify-center">
                            {[...Array(30)].map((_, i) => (
                              <div key={i} className="w-2 h-2 bg-emerald-300 rounded-full float-anim" style={{animationDelay: `${Math.random()}s`}}></div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Glass rim reflection */}
                  <div className="absolute top-[35%] left-[50%] -translate-x-1/2 w-56 h-4 border-t border-white/10 rounded-[50%]"></div>

                  {reactionProgress >= 100 && (
                    <div className="absolute bottom-10 text-emerald-400 font-bold flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
                      <CheckCircle2 className="w-10 h-10" /> 
                      <span className="bg-slate-900/80 px-4 py-2 rounded-full border border-emerald-500/30">اكتمل التفاعل!</span>
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}

          {/* Section 3: Quiz */}
          {activeTab === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-emerald-400 flex items-center gap-2 justify-center">
                <HelpCircle className="w-6 h-6" /> تحدي المعرفة
              </h2>

              {!showResults ? (
                <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl">
                  <div className="flex justify-between items-center mb-8 text-sm font-bold text-slate-400 bg-slate-950 p-4 rounded-xl">
                    <span>السؤال {currentQuestion + 1} من {questions.length}</span>
                    <span className="text-emerald-400">النقاط: {score}</span>
                  </div>
                  
                  <div className="mb-10">
                    <h3 className="text-2xl font-bold text-white leading-relaxed text-center">
                      {questions[currentQuestion].question}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {questions[currentQuestion].options.map((option, index) => {
                      let btnClass = "w-full text-right p-5 rounded-2xl border-2 transition-all duration-200 font-medium text-lg flex justify-between items-center group ";
                      
                      if (selectedAnswer === null) {
                        btnClass += "border-slate-700 bg-slate-800 hover:border-emerald-500 hover:bg-emerald-900/20 text-slate-200";
                      } else {
                        if (index === questions[currentQuestion].answer) {
                          btnClass += "border-emerald-500 bg-emerald-900/40 text-emerald-300"; 
                        } else if (index === selectedAnswer) {
                          btnClass += "border-red-500 bg-red-900/20 text-red-400"; 
                        } else {
                          btnClass += "border-slate-800 bg-slate-900 text-slate-600 opacity-50"; 
                        }
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerSubmit(index)}
                          disabled={selectedAnswer !== null}
                          className={btnClass}
                        >
                          <span>{option}</span>
                          {selectedAnswer !== null && index === questions[currentQuestion].answer && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                          {selectedAnswer === index && index !== questions[currentQuestion].answer && <XCircle className="w-6 h-6 text-red-500" />}
                          {selectedAnswer === null && <div className="w-6 h-6 rounded-full border-2 border-slate-600 group-hover:border-emerald-500 transition-colors"></div>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900 p-12 rounded-3xl border border-slate-800 text-center shadow-xl">
                  <div className="w-28 h-28 bg-emerald-900/30 border-4 border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Activity className="w-14 h-14 text-emerald-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">اكتمل التحدي!</h3>
                  <p className="text-xl text-slate-400 mb-10">
                    لقد أجبت بشكل صحيح على <strong className="text-emerald-400 text-3xl mx-2">{score}</strong> من أصل <strong className="text-white text-xl mx-1">{questions.length}</strong> أسئلة.
                  </p>
                  <button 
                    onClick={resetQuiz}
                    className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors inline-flex items-center gap-3 text-lg"
                  >
                    <RotateCcw className="w-6 h-6" /> إعادة الاختبار
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Section 4: Practical Applications */}
          {activeTab === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold mb-3 text-emerald-400 flex items-center gap-2">
                <Lightbulb className="w-6 h-6" /> تطبيقات في حياتنا اليومية
              </h2>
              <p className="text-slate-400 mb-10 text-lg">أين نرى تأثير مساحة السطح على سرعة التفاعل في عالمنا الحقيقي؟</p>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Application 1 */}
                <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 hover:border-emerald-500/50 transition-colors duration-300 group">
                  <div className="w-16 h-16 bg-orange-900/30 text-orange-400 rounded-2xl flex items-center justify-center mb-6 border border-orange-500/30 group-hover:scale-110 transition-transform">
                    <Utensils className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">مضغ الطعام</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    توصي النصائح الصحية بمضغ الطعام جيداً قبل بلعه؛ لأن تفتيت الطعام يزيد من مساحة سطحه، مما يسهل ويسرع عمل الإنزيمات الهاضمة في المعدة.
                  </p>
                </div>

                {/* Application 2 */}
                <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 hover:border-emerald-500/50 transition-colors duration-300 group">
                  <div className="w-16 h-16 bg-blue-900/30 text-blue-400 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30 group-hover:scale-110 transition-transform">
                    <Coffee className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">إذابة السكر والقهوة</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    نستخدم السكر الناعم بدلاً من مكعبات السكر الكبيرة في المشروبات الباردة لأنه يذوب بشكل أسرع بكثير بسبب تعرض جزيئات أكثر للماء.
                  </p>
                </div>

                {/* Application 3 */}
                <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 hover:border-emerald-500/50 transition-colors duration-300 group">
                  <div className="w-16 h-16 bg-red-900/30 text-red-400 rounded-2xl flex items-center justify-center mb-6 border border-red-500/30 group-hover:scale-110 transition-transform">
                    <Flame className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">إشعال الحرائق (الفحم)</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    عند محاولة إشعال نار، نستخدم نشارة الخشب أو قطعاً صغيرة جداً بدلاً من جذع شجرة كامل؛ لأن مساحة السطح الكبيرة تجعل تفاعل الاحتراق أسرع وأسهل.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 bg-emerald-950/40 border border-emerald-900/60 p-6 rounded-2xl text-center flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="p-3 bg-emerald-900/50 rounded-full">
                  <Sparkles className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-right">
                  <h3 className="text-lg font-bold text-white">الخلاصة الكيميائية:</h3>
                  <p className="text-emerald-200">زيادة مساحة السطح = زيادة عدد التصادمات بين الجزيئات = تفاعل كيميائي أسرع!</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default App;

