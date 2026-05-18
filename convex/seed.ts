import { mutation } from "./_generated/server";
import { v } from "convex/values";

const rawQuestions = `GETTING TO KNOW EACH OTHER	1	How did you meet?	Met through mutual friends and connected naturally.	He made the first move through social media or direct messaging.	He inserted himself into your life through frequent “accidental” encounters.
GETTING TO KNOW EACH OTHER	2	Who initiated contact and how did that make you feel?	He was respectful and took his time.	He pushed to start conversations and seemed overbearing.	He made you feel like you had to keep up with his energy or else he’d lose interest.
GETTING TO KNOW EACH OTHER	3	Did he seem genuinely interested in your personality or mostly your appearance?	He asked meaningful questions and showed interest in your thoughts and experiences.	His compliments focused primarily on how you look, rather than who you are.	He seemed to mirror your likes, without offering anything of his own.
GETTING TO KNOW EACH OTHER	4	Did he ask meaningful questions about your values, beliefs, and goals?	He was genuinely curious about your deeper values.	He only asked surface-level questions to get to know you better.	He avoided deeper questions and steered conversations toward more superficial topics.
GETTING TO KNOW EACH OTHER	5	Was he respectful of your pace in getting to know each other?	He allowed things to progress naturally at a comfortable pace for both of you.	He encouraged quick progression, pushing for exclusivity early on.	He was impatient and seemed frustrated when you didn’t move at his desired pace.
GETTING TO KNOW EACH OTHER	6	Did he create situations to spend time with you, or try to isolate you early on?	He made genuine efforts to plan activities with you.	He tried to monopolize your time and prevent you from seeing others.	He subtly isolated you from your circle, often creating excuses to be alone with you.
GETTING TO KNOW EACH OTHER	7	Was he overly complimentary to the point of feeling insincere?	Compliments felt authentic and balanced with personal admiration.	Compliments felt exaggerated or overly focused on physical appearance.	Compliments were frequent but felt like a way to manipulate or control you.
GETTING TO KNOW EACH OTHER	8	Did he make you feel special or like one of many options?	He made you feel like a priority, and his attention was focused on you.	He seemed to juggle multiple options, always making you feel uncertain.	His actions made you feel secondary to his other interests or people.
GETTING TO KNOW EACH OTHER	9	Did he seem to mirror your interests too perfectly?	He shared similar interests and hobbies that deepened the connection.	His interests seemed too perfect, almost like he was trying to copy yours.	He never shared his own interests and just mimicked yours to gain favor.
GETTING TO KNOW EACH OTHER	10	Did he push for a relationship title or exclusivity quickly?	He was comfortable waiting for the right moment to discuss exclusivity.	He pushed for titles or exclusivity too early, pressuring you into a commitment.	He made you feel like something was wrong with you if you didn’t want a title immediately.
GETTING TO KNOW EACH OTHER	11	Did he respect your feelings and boundaries in the early stages?	He respected your boundaries and made sure you felt comfortable.	He occasionally tested your boundaries, but you didn’t mind.	He ignored your boundaries or pressured you into situations you didn’t want.
CONTROL & INDEPENDENCE	12	Does he encourage your friendships and family connections?	He supports and encourages your social life and family ties.	He doesn’t mind your connections but doesn’t show much interest.	He subtly discourages your relationships with others to keep you to himself.
CONTROL & INDEPENDENCE	13	Has he ever spoken negatively about people close to you?	He respects and appreciates your friends and family.	He’s occasionally mentioned some people, but in a neutral or joking way.	He often criticizes or belittles people you care about, trying to make you feel conflicted.
CONTROL & INDEPENDENCE	14	Has he make you feel guilty for spending time away from him?	He encourages you to enjoy time with friends and family.	He makes mild comments about missing you but respects your need for space.	He makes you feel guilty, saying you prioritize others over him.
CONTROL & INDEPENDENCE	15	Has he pressured you to quit a job, hobby, or activity?	He supports your interests and goals.	He seems indifferent but never actively discourages your hobbies.	He tries to convince you that you don’t need other things in your life besides him.
CONTROL & INDEPENDENCE	16	Has he ever made comments like "you don't need them, you have me"?	He respects your relationships and encourages you to maintain them.	He occasionally makes comments about being your priority but doesn’t push it.	He insists you don’t need anyone else but him, isolating you from loved ones.
CONTROL & INDEPENDENCE	17	Does he comment negatively on how you dress, speak, or carry yourself?	He appreciates your style and individuality.	He occasionally makes harmless jokes about your appearance.	He criticizes your style or suggests you change things about yourself to please him.
CONTROL & INDEPENDENCE	18	Does he get jealous easily and accuse you of flirting?	He trusts you completely and doesn’t show jealousy.	He gets jealous sometimes, but you both talk it through.	He frequently accuses you of flirting or being unfaithful without cause.
CONTROL & INDEPENDENCE	19	Has he ever given you the silent treatment for not obeying his preferences?	He communicates openly about his feelings.	He withdraws occasionally, but always comes back to discuss issues.	He uses silence as punishment when you don’t comply with his wishes.
CONTROL & INDEPENDENCE	20	Does he insist on being part of all your plans?	He is happy to let you have time to yourself and with others.	He often asks to join in on your plans but doesn’t pressure you.	He demands to be included in everything you do, showing resentment if not invited.
CONTROL & INDEPENDENCE	21	Has he ever demanded your passwords or checked your devices without permission?	He respects your privacy and boundaries.	He asks occasionally to see your devices, but you feel it’s more out of curiosity.	He frequently demands passwords or checks your devices without asking.
CONTROL & INDEPENDENCE	22	Do you feel like your choices need his approval?	You feel confident and independent in your decisions.	You sometimes ask for his opinion but make your own choices.	You feel as if you need his approval to make basic decisions.
EMOTIONAL DYNAMICS	23	Does he celebrate your successes or diminish them?	He celebrates your wins and encourages you to keep growing.	He’s indifferent or somewhat dismissive about your successes.	He downplays or dismisses your achievements to make you feel small.
EMOTIONAL DYNAMICS	24	Has he made fun of you in front of others and called it a "joke"?	He jokes around but always in a lighthearted, respectful way.	He occasionally makes jokes at your expense, but you laugh it off.	He regularly mocks you, even in front of others, making you feel uncomfortable.
EMOTIONAL DYNAMICS	25	Does he listen actively or dismiss your concerns?	He listens carefully and values your opinions.	He listens but often cuts you off or changes the subject.	He dismisses your concerns as unimportant or irrelevant.
EMOTIONAL DYNAMICS	26	Does he validate your emotions or label them as irrational?	He acknowledges your feelings and empathizes with them.	He sometimes questions why you feel a certain way but listens.	He constantly invalidates your feelings, calling them "irrational" or "dramatic."
EMOTIONAL DYNAMICS	27	Does he ever compare you to other women to manipulate you?	He never compares you to others; he values you for who you are.	He occasionally mentions others but in a non-critical way.	He compares you to other women to make you feel inadequate or insecure.
EMOTIONAL DYNAMICS	28	Has he ever turned your vulnerabilities against you in an argument?	He is understanding and never uses your vulnerabilities against you.	He sometimes brings up past issues but only to make a point.	He often uses your personal struggles to hurt or manipulate you.
EMOTIONAL DYNAMICS	29	Does he take responsibility for his actions or always blame someone else?	He takes ownership and apologizes when he’s wrong.	He shifts blame sometimes but eventually takes responsibility.	He constantly deflects blame, never admitting when he’s wrong.
EMOTIONAL DYNAMICS	30	Does he acknowledge your emotional needs or make you feel needy?	He supports your emotional needs and makes sure you feel heard.	He occasionally acknowledges your needs but isn’t very responsive.	He minimizes or ignores your emotional needs, making you feel like you're asking for too much.
SEXUAL BEHAVIOR & INTIMACY	31	Was your first sexual experience with him consensual and comfortable?	He ensured you were comfortable and communicated openly about boundaries.	He was respectful, but the experience lacked communication about comfort levels.	He pressured you into sex or didn’t take no for an answer.
SEXUAL BEHAVIOR & INTIMACY	32	Did he communicate and check in about your comfort levels?	He checked in throughout and ensured you felt safe.	He asked a few times, but it felt like an afterthought.	He didn’t ask about your comfort and ignored your signs of discomfort.
SEXUAL BEHAVIOR & INTIMACY	33	Has he respected your "no" without guilt-tripping?	He immediately respected your "no" and didn’t push further.	He pushed a little but ultimately respected your wishes.	He tried to manipulate or guilt-trip you into changing your mind.
SEXUAL BEHAVIOR & INTIMACY	34	Has he ever tried to make you feel obligated to have sex?	He never pressured you and respected your pace.	He occasionally mentioned it, but always respected your decision.	He tried to guilt you into sex by saying things like “If you loved me, you would.”
SEXUAL BEHAVIOR & INTIMACY	35	Does he initiate sex respectfully, or through manipulation or mood shifts?	He respects your feelings and initiates sex in a comfortable, consensual manner.	He sometimes tries to initiate sex but respects your boundaries.	He uses manipulation, mood shifts, or guilt to get you to engage in sex.
SEXUAL BEHAVIOR & INTIMACY	36	Has he ever made you feel ashamed or insecure about your body?	He appreciates your body and makes you feel confident.	He occasionally makes comments about appearance, but you don’t feel insecure.	He often criticizes or makes you feel ashamed of your body or appearance.
SEXUAL BEHAVIOR & INTIMACY	37	Does he care about your pleasure and comfort during intimacy?	He’s attentive to your needs and comfort, always checking in.	He’s somewhat attentive but could improve on being mindful of your pleasure.	He disregards your comfort and focuses only on his own pleasure.
SEXUAL BEHAVIOR & INTIMACY	38	Does he become cold or irritable if you're not interested in sex?	He respects your decision and shows understanding.	He’s disappointed but doesn’t take it personally.	He becomes irritable, upset, or distant when you’re not interested in sex.
SEXUAL BEHAVIOR & INTIMACY	39	Has he ever guilted you by saying things like "if you loved me you would"?	He has never used guilt to pressure you into sex.	He’s made small, non-pressuring comments, but they didn’t affect you.	He regularly uses guilt to pressure you into sex or intimacy.
HEALTH MOMENTS	40	How does he act when you're unwell, in pain, or on your period?	He’s caring and supportive, offering to help and comfort you.	He’s indifferent but doesn’t mind helping when needed.	He’s dismissive or annoyed when you need care or attention.
HEALTH MOMENTS	41	Is he supportive and caring or dismissive and irritated?	He offers to take care of you and shows genuine concern.	He tolerates your needs but doesn’t show much care.	He gets irritated, showing little empathy or care for your discomfort.
HEALTH MOMENTS	42	Has he ever mocked your health concerns?	He takes your concerns seriously and offers support.	He sometimes jokes about them, but you can tell it’s out of love.	He mocks or dismisses your health concerns, making you feel invalidated.
HEALTH MOMENTS	43	Does he expect you to care for him when he's sick, but not return the care?	He offers help when you’re sick and treats you with the same care.	He occasionally asks for your care, but he’s willing to reciprocate.	He expects you to take care of him but refuses to do the same when you’re unwell.
HEALTH MOMENTS	44	Has he respected your need for rest or alone time when unwell?	He respects your need to rest and gives you space.	He’s supportive but insists on being close to you, even if you want space.	He pressures you to engage with him or others, ignoring your need to rest.
HEALTH MOMENTS	45	Has he made you feel like a burden when you're vulnerable?	He’s understanding and reassures you that you’re not a burden.	He seems indifferent or uncomfortable but doesn’t make you feel bad.	He makes you feel guilty or like a burden when you need his help.
CONFLICT	46	How does he handle disagreements—calmly or aggressively?	He stays calm and seeks to understand your point of view.	He gets frustrated but tries to listen to your side of the argument.	He gets aggressive or raises his voice, shutting down communication.
CONFLICT	47	Does he raise his voice, call names, or resort to insults?	He keeps his tone respectful and avoids personal attacks.	He occasionally raises his voice but never resorts to name-calling.	He frequently calls you names, insults you, or raises his voice during arguments.
CONFLICT	48	Does he listen or just wait to speak?	He listens carefully, making sure to understand your perspective.	He listens, but he’s quick to interrupt or steer the conversation his way.	He doesn’t listen to you at all and just waits to make his point.
CONFLICT	49	Has he used ultimatums or threats during arguments?	He avoids threats and focuses on finding mutual solutions.	He sometimes uses ultimatums, but they’re not frequent.	He regularly resorts to ultimatums or threats to get his way.
CONFLICT	50	Has he ever denied saying something you clearly remember?	He acknowledges his words and actions without denying them.	He occasionally forgets or misremembers things, but admits it.	He denies things he’s said or done, making you question your memory.
PUBLIC VS PRIVATE	51	Is he affectionate in public but cold in private?	He’s affectionate both in private and public, showing consistent warmth.	He’s affectionate in public but distant when alone.	He’s cold or dismissive in both settings, offering little affection.
PUBLIC VS PRIVATE	52	Do others see him as kind while you experience cruelty?	He’s consistently kind and considerate to both you and others.	He’s kind to others, but sometimes shows cruelty or indifference to you.	He behaves kindly in public but is cruel or dismissive when alone with you.
PUBLIC VS PRIVATE	53	Does he behave differently around authority figures or strangers?	He’s the same, whether around authority figures, strangers, or alone with you.	He’s more respectful or agreeable around authority figures but still acts decently.	He changes his behavior drastically around authority figures, often to your detriment.
PUBLIC VS PRIVATE	54	Has he ever embarrassed or undermined you in front of others?	He supports and lifts you up, even in social settings.	He’s joked or made a playful comment that didn’t feel too hurtful.	He has humiliated or undermined you in front of others, making you uncomfortable.
PUBLIC VS PRIVATE	55	Is his private persona more controlling than his public one?	He’s consistent in his kindness and openness, both in private and public.	He’s controlling at times, but not overtly so in either setting.	He’s much more controlling when you're alone, compared to how he acts publicly.
PUBLIC VS PRIVATE	56	Has he asked you to keep parts of your relationship secret?	He’s open about your relationship and encourages transparency.	He’s asked you to keep a few private details but not in an abusive way.	He pressures you to hide parts of the relationship, often isolating you from others.
GASLIGHTING	57	Has he ever made you question your version of reality?	He respects your perception and never invalidates your experiences.	He occasionally challenges your perceptions but doesn’t make you doubt yourself.	He frequently makes you question reality, leading to confusion and self-doubt.
GASLIGHTING	58	Does he deny things he said or did, even when you're certain?	He acknowledges his actions and takes responsibility for them.	He sometimes forgets or misremembers but admits to it.	He denies saying or doing things you clearly remember, making you feel gaslit.
GASLIGHTING	59	Has he accused you of being too sensitive or crazy when you express feelings?	He respects your emotions and tries to understand your point of view.	He may question your feelings but doesn’t dismiss them as irrational.	He accuses you of overreacting or being "too sensitive" to invalidate your emotions.
GASLIGHTING	60	Has he blamed you for his own bad behavior or mistakes?	He takes accountability for his actions and doesn’t shift blame.	He acknowledges his faults but sometimes deflects responsibility.	He frequently blames you or others for his own bad behavior or mistakes.
GASLIGHTING	61	Does he constantly shift blame or dodge accountability?	He owns up to his actions and accepts responsibility for his mistakes.	He occasionally avoids responsibility but doesn’t make it a habit.	He constantly shifts blame and avoids taking responsibility for his actions.
GASLIGHTING	62	Does he use phrases like “You’re imagining things” or “That never happened”?	He respects your version of events and acknowledges them.	He occasionally denies things but doesn’t often use dismissive phrases.	He regularly uses phrases like “You’re imagining things” to dismiss your feelings.
GASLIGHTING	63	Has he ever turned others against you with lies or exaggerations?	He’s honest and transparent with others about the relationship.	He sometimes exaggerates or withholds details, but not in a harmful way.	He’s spread lies or exaggerated the truth to manipulate others’ perceptions of you.
GASLIGHTING	64	Has he invalidated your emotions by saying you're overreacting?	He listens to your feelings and validates your emotional responses.	He sometimes questions your reactions but doesn’t dismiss them outright.	He frequently dismisses your emotions, calling you "overdramatic" or "overreacting."
GASLIGHTING	65	Has he minimized your concerns by saying, “It’s not a big deal”?	He respects your concerns and takes them seriously.	He might downplay some concerns, but he listens to your worries.	He minimizes your concerns, making you feel as though they’re insignificant.
GASLIGHTING	66	Does he insist on a version of events that favors him regardless of facts?	He respects your perspective and listens to your side of the story.	He sometimes argues his version but eventually listens to yours.	He stubbornly insists on his version of events, even when facts suggest otherwise.
GASLIGHTING	67	Has he made you feel unsure whether you're the problem?	He reassures you and shows understanding when you have doubts.	He occasionally makes you question your actions, but not in a manipulative way.	He often makes you feel like you’re the problem, confusing you about reality.
GASLIGHTING	68	Has he isolated you and then claimed you chose it?	He encourages you to spend time with others and maintains a healthy social life.	He’s okay with you spending time alone but doesn’t push isolation.	He isolates you from friends or family, then blames you for it.
PATTERNS	69	Do you feel like you're constantly walking on eggshells?	You feel comfortable and at ease in your relationship.	You occasionally feel unsure, but the relationship is mostly peaceful.	You feel like you need to be cautious and walk on eggshells around him.
PATTERNS	70	Have your friends or family expressed concern about him?	They support your relationship and express no concerns.	They’ve offered some gentle advice but are generally supportive.	They’ve strongly expressed concerns about his behavior or your well-being.
PATTERNS	71	Do you feel more anxious since being with him?	You feel calm, secure, and emotionally stable.	You feel a little anxious at times, but not consistently.	You feel consistently anxious, uncertain, or uneasy around him.
PATTERNS	72	Have you stopped doing things you love since the relationship began?	You feel supported in your passions and hobbies.	You’ve cut back a little, but you still enjoy the things you love.	You’ve stopped doing things you love due to his influence or restrictions.
PATTERNS	73	Do you find yourself making excuses for his behavior to others?	You speak openly about his positive traits and the relationship is healthy.	You occasionally defend him, but it doesn’t feel forced.	You regularly find yourself making excuses for behaviors that don’t sit right.
PATTERNS	74	Have you lost confidence or self-esteem?	You feel confident, valued, and appreciated in the relationship.	You occasionally doubt yourself but feel generally secure.	You feel like your confidence has diminished since being with him.
PATTERNS	75	Do you ever feel like you're "not allowed" to have needs?	You feel safe expressing your needs and desires in the relationship.	He occasionally disregards your needs, but you can still express them.	You feel like your needs are ignored or even punished when expressed.
PATTERNS	76	Has he made you question your memory or judgment?	He respects your recollection and doesn’t manipulate your memory.	He occasionally questions your memory but not in a harmful way.	He frequently makes you doubt your memory or judgment, creating confusion.
PATTERNS	77	Do you feel like you're being watched or monitored?	He trusts you fully and respects your privacy.	He occasionally checks on you, but it doesn’t feel invasive.	He regularly monitors or controls your actions, making you feel trapped.
PATTERNS	78	Do you have a nagging feeling that something isn't right, even when things seem fine?	You feel at peace, and things feel right in the relationship.	You occasionally feel ecosystem, but there’s no strong sense of something wrong.	You often feel like something’s off, but can’t quite put your finger on it.
RED FLAGS	79	Has he ever physically hurt or threatened you?	He has never physically harmed or threatened you in any way.	He has raised his voice or had moments of aggression, but never physically harmed you.	He has physically hurt you or threatened to do so.
RED FLAGS	80	Does he intimidate or control your actions, socializing, or personal space?	He respects your boundaries and personal space.	He sometimes wants to control your socializing, but not in a harmful way.	He regularly intimidates, controls, or isolates you, disregarding your autonomy.
RED FLAGS	81	Have you ever been afraid of what he might do or say when he's angry?	You never fear his reactions, as he handles anger respectfully.	You occasionally feel uneasy but not afraid of his anger.	You fear what he might do or say when he’s angry, feeling unsafe.`;

const rawTactics = `1	Weaponized Incompetence	"I’m just so bad at planning, I always mess it up. You're so much better at it, can't you just handle the booking?"	"I’m not your manager. If you don't book it, we aren't going. I'm okay with that outcome."
2	Love Bombing	"I’ve never felt this way about anyone before. I think you’re 'The One.' Why would we wait to move in?"	"Intensity isn't intimacy. I value a slow pace. Let’s talk about this again in six months."
3	The "Cool Girl" Trap	"My ex was so high-maintenance and crazy. I love that you’re so chill and don't make a big deal out of things."	"I am not 'chill' about my needs. I value clear communication. If I have a problem, I will speak it."
4	Future Fetching	"Once I get that promotion, I’m going to take you to Paris. Everything will be perfect then, just wait."	"I don't live in the future. I’m looking at how you treat me today. Paris doesn't fix today's silence."
5	Financial Enmeshment	"Babe, let me just pay that off for you. I'll handle all the bills from my account so you don't have to stress."	"I value my autonomy. I am responsible for my own safety. I’ll keep my accounts separate."
6	Pocketing	"Our relationship is so sacred to me, I don't want to ruin the 'vibe' by bringing in outside opinions/family yet."	"I value integration. If I am a priority, I should be a known part of your world. I won't be a secret."
7	Parasitic Vulnerability	"I had such a hard childhood, that's why I shut down. You're the only one who truly understands me."	"I am your partner, not your therapist. I care about your healing, but I need space for my feelings too."
8	Boundary Erosion	"I know you said no calls after 10, but I just missed you so much. Don't be mad, it's because I love you."	"Love respects 'No'. I am hanging up now as agreed. We can talk tomorrow during my available hours."
9	Gaslit Neglect	"I wasn't ignoring you for three days; I was 'protecting my energy' and doing 'shadow work'. You're being clingy."	"Reliability is a requirement. Using therapy-speak to justify neglect doesn't work for me. I need consistency."
10	The "Helpful" Critic	"I’m only telling you that dress is too short because I don't want people looking at you the wrong way. I'm protecting you."	"I didn't ask for a critique. I am happy with my choices. I need a partner who is a fan, not a critic."
11	Tone Policing	"I’d listen to you if you weren't being so emotional/loud right now."	"My delivery does not invalidate my data. We can pause, but the facts remain the same."
12	Hostile Humor	"God, you’re so sensitive. It was just a joke, don’t be a buzzkill."	"I don't find insults funny. If that’s your humor, we aren't a baseline match."
13	Selective Honesty	"I didn't lie to you, I just didn't think that specific detail was important."	"Omission is a choice. I require full transparency to maintain my trust."
14	The Crisis Pivot	"I know you're upset, but I’m having a really hard day at work/home."	"Your bad day is not a hall pass to ignore the impact of your actions on me."
15	Privacy vs. Secrecy	"If you trust me, you shouldn't need to know who I’m texting at 1 AM."	"Trust is built on openness. Secrecy creates a gap I am not obligated to bridge."
16	The Debt of Gratitude	"After everything I’ve done for you/bought for you, you’re going to treat me like this?"	"Generosity is not a transaction. I do not owe my boundaries as payment for gifts."
17	Intellectual Superiority	"You wouldn't understand the technical side of this, let me just handle it."	"I am more than capable. If you can't explain it simply, you don't understand it well enough."
18	The Comparison Trap	"My ex never had an issue with me doing [Disrespectful Behavior]."	"I am the current standard. Her boundaries are her history; mine are your present."
19	Intermittent Attention	"I was just 'in the zone.' You know I get busy. Stop being so needy."	"Consistency is a basic requirement. My need for communication is valid, not 'needy'."
20	Reverse Rescue	"I’m such a mess, only you can help me get my life back on track."	"I am a partner, not a project. You must be the primary architect of your own life."
21	Physical Threshold Testing	"Come on, it's just a kiss/hug, don't be so cold/stiff."	"My body is not a negotiation. When I pull back, that is a full sentence."
22	The Isolation Filter	"Your friends don't actually want what's best for you like I do."	"My support system is non-negotiable. I trust my judgment on who loves me."
23	The Forced Ultimatum	"If you go to that event/job, then I guess we’re just done."	"I don't respond to threats. If this is an ultimatum, you have your answer."
24	Interest Mimicry	"I love everything you love! We are literally the exact same person."	"I value individuality. I’m looking for a partner, not a mirror of myself."
25	The 'Safety' Controller	"I just need your location so I know you're safe. It's because I care."	"I managed my safety before we met. I’ll share my location when I choose to, not by default."
26	Revisionist History	"I never said that. You’re misremembering things again."	"My memory is reliable. I will not debate the reality of what occurred."
27	The Pity Play	"Everyone always leaves me. I’m just waiting for you to do it too."	"I am not responsible for your past. I will be judged on my actions, not your fears."
28	Digital Surveillance	"I saw you liked his photo from three years ago. What’s going on there?"	"Monitoring my digital history is a red flag. I don't justify my past to insecure curiosity."
29	Foundation Bypassing	"Why wait? When you know, you know. Let's just skip the small talk."	"Foundations take time. I’m enjoying the process of actually getting to know you."
30	Weaponized Virtue	"As a 'Good Man/Christian/Traditional Guy,' I would never do that to you."	"Character is shown, not announced. I’ll believe the behavior, not the title."
31	The "Investment" Pressure	"If we’re building a future, your money is our money. Why are you being so stingy with your savings?"	"I am the CEO of my own safety. My personal savings is the foundation of my independence."
32	Social Media "Vibe" Control	"Don’t post that photo. It doesn't look right for my brand/our image as a couple."	"I am my own brand. My digital expression is not subject to your PR approval."
33	The "Busy" Devaluation	"I’m doing big things. You should be proud to have even 5 minutes of my time right now."	"My time is a premium asset. If you can't budget for me, I’ll reallocate my attention."
34	The "Humble Brag" Comparison	"My business partner’s wife is so supportive; she never asks questions about where he is."	"I am a partner, not a silent stakeholder. Curiosity is a sign of engagement, not 'difficulty'."
35	The Account Sweep	"Let me just handle the taxes/passwords/logins. It’s too complicated for you to worry about."	"Knowledge is power. I choose to be fully literate in the mechanics of my own life."
36	The Public Correction	"Actually, what she meant to say was [X]. She’s just a bit tired today."	"I speak for myself. I am perfectly capable of articulating my own thoughts."
37	The "Loyalty" Test	"If you really loved me, you’d cut off that friend. They clearly don't respect our relationship."	"My loyalty is earned, not demanded. I decide who stays in my support system."
38	The "Secret" Spend	"I bought this for 'us,' but I used your credit card because mine was in the car. It’s for the house!"	"My credit is my future. No one spends my resources without my explicit authorization."
39	The Intellectual Gazumping	"I’ve read more books on this than you. Just trust my logic; your 'intuition' isn't data."	"My intuition is a valid data point. Logic without empathy is just a calculation."
40	The "Traditional" Pay-Wall	"Since I pay for dinner, I get to decide where we go and when it’s time to leave."	"Equality isn't for sale. A dinner is a gift, not a purchase of my agency."
41	The Emotional Ransom	"If you go out tonight, I’m going to be so depressed. I don't know what I'll do to myself."	"I am not the guardian of your stability. You are responsible for your own emotional health."
42	The Milestone Hold-Up	"I’ll propose/move in after you prove you can change [X behavior] to suit me."	"I am not a project on a timeline. I am a person to be loved, not a performance to be graded."
43	The "Just Checking" Log	"I saw you were online at 2 AM. Who were you talking to? I’m just curious."	"My digital presence is not a tracking device. I don't owe an itinerary of my wakeful hours."
44	The Accomplishment Diminisher	"That’s a nice little win for your hobby, but it’s not like you’re making real money yet."	"My victories are significant. I celebrate my progress regardless of your valuation."
45	The "Our" Problem	"We’re overdrawn again. You need to work more hours to cover the rent this month."	"I am responsible for my choices, not your deficits. Let’s look at your spending first."
46	The Social Slander	"Everyone thinks you’re being difficult. I’m the only one who defends you to them."	"I don't fear the opinions of people I don't respect. If they have a problem, they can tell me."
47	The "Open" Coercion	"If we were truly 'evolved,' we’d have an open relationship. You’re just being possessive."	"My boundaries are my evolution. Monogamy is my choice, not a lack of 'growth'."
48	The Resource Drain	"I need to borrow your car/laptop/money for my big launch. Don't you want me to succeed?"	"I protect the tools of my own success. I am not your secondary resource pool."
49	The Aesthetic "Advice"	"I liked you better when you [Wore less makeup/Had longer hair]. You looked more 'natural'."	"I am the artist of my own image. I dress and groom for my own satisfaction."
50	The "One Day" Ghost	"I’m just not ready for a label. But I’m yours. Don't be so obsessed with 'titles'."	"Labels are clarity. Clarity is respect. I don't invest in 'one day' at the expense of today."
51	The Sunk Cost Anchor	"We’ve spent 10 years building this. You’re really going to throw all that history away over one 'mistake'?"	"History is not a cage. I am not obligated to invest more time into a failing venture, regardless of the past."
52	The Professional Saboteur	"Your new promotion is going to ruin our family dynamic. Don't be so selfish; your career isn't everything."	"My success is a communal asset, not a threat. I refuse to shrink so you can feel significant."
53	Health-Based Hostage	"I’m so sick/stressed because of how you treat me. If you leave, I don't think my heart can take it."	"I am a partner, not a physician. Your health is your responsibility; my presence is not a medical treatment."
54	The Social Circle Siege	"If we break up, everyone in our group is going to take my side. You’ll have no one left."	"My worth is not a popularity contest. Genuine friends will see the truth; the rest are just noise."
55	The "Better for the Kids" Lie	"You’re being selfish. Kids need a 'complete' home, even if we’re miserable. Think of them for once."	"Kids need a healthy blueprint. I refuse to model a toxic dynamic as their standard for 'home'."
56	The Shared History Monopoly	"Nobody else will ever love you like I do, because nobody else knows the 'real' you like I do."	"You don't own my narrative. Being known is not a debt; I am free to be 'known' by someone better."
57	The Legacy Gaslight	"You remember the 'bad times' wrong. We were happy. You’re just rewriting history to make me the villain."	"I trust my lived experience. My perspective on our history is valid and does not require your consensus."
58	The Lifestyle Ransom	"You’ll never find someone who can provide this level of lifestyle for you. Are you ready to be poor again?"	"Luxury is not a trade for my dignity. I would rather build my own floor than live in your gilded cage."
59	Fake Evolution (The Pivot)	"I’ve changed! I'm doing the work now. You can't leave just when I'm finally becoming the man you wanted."	"I am not a reward for your basic growth. I celebrate your change, but I am not obligated to stay for the results."
60	The Co-Dependency Contract	"We’re a team. I handle the 'world' and you handle 'me.' That’s how it’s always been."	"I am an individual, not a support function. I am re-negotiating my role to prioritize my own agency."
61	The Reputation Insurance	"Think about what people will say. We look so perfect from the outside. Why ruin the image?"	"I live for my reality, not my image. I refuse to die inside just to look 'perfect' on a screen."
62	The "Only I Help" Filter	"Your family is toxic; I'm the only one who really protects you from them. You need me."	"I am my own primary protector. I will manage my family on my terms, without your interference."
63	The Domestic Devaluation	"All you do is stay home/work part-time. I'm the one doing the real work here. My voice carries more weight."	"Effort is not measured solely in dollars. My contribution to this life is equal in value and authority."
64	The Spiritual Superiority	"As the 'Head of the House,' I have the final say. It’s what our faith/values demand of you."	"True leadership is not a dictatorship. My values include mutual respect and shared agency."
65	The "Change of Heart" Cycle	"I know I messed up, but my heart is in the right place. Can't you just see my 'intent'?"	"Intentions don't pay the bills of trust. I judge by the impact of your actions, not the 'goodness' of your thoughts."
66	The Golden Handcuffs	"I put everything in my name for 'tax reasons.' You don't need to worry about the paperwork."	"Opacity is a red flag. I require a seat at the table where my future is being signed away."
67	Weaponized Memory	"Remember when I saved you from [Past Trauma]? You owe it to me to stay and work through this."	"A past kindness is not a lifelong lien. My gratitude for the past does not buy my compliance in the present."
68	The Revolving Door Exit	"Fine, leave! But don't come crawling back when you realize the world is harder than you think."	"I am moving forward, not backward. My exit is a choice of strength, not a trial run."
69	The "One Day" Dangle	"I'll marry you/have kids/buy the house once I feel 'safe' that you're not going to change on me."	"Safety is a two-way street. I won't audition indefinitely for a commitment you're using as a carrot."
70	The Moral Exhaustion	"I'm just so tired of fighting for us. Why can't you just let things be easy for once?"	"Easy' is often a euphemism for 'quiet compliance.' I prefer a healthy conflict over a silent surrender."
71	The Savior Trap	"I’m just too kind for this world; I always get burned. You’re the only one who won’t hurt me."	"I am your partner, not your rehabilitation. Your past 'kindness' is no excuse for lack of present boundaries."
72	The Pedestal Saboteur	"You’re so much better than me, I don't even deserve you. I’m just waiting for you to realize it."	"Guilt-tripping me with your insecurity is a choice. I’m looking for a peer, not a person to constantly reassure."
73	The Expert Gaslight	"You lack the psychological vocabulary to understand why your reaction is actually a trauma response."	"I don't need a PhD to identify my own discomfort. My feelings are data, not a 'condition' for you to diagnose."
74	Weaponized Fragility	"When you speak your truth so harshly, it literally breaks me. I can’t handle your 'intensity'."	"My truth is not an attack. If you cannot handle a direct conversation, we cannot build a healthy future."
75	The "Evolved" Narcissist	"I’ve done the shadow work. I’m above these petty arguments. You’re just operating at a lower frequency."	"Spiritual language doesn't mask emotional neglect. Growth is measured by how you treat me, not the books you read."
76	The Strategic Pressure	"If we don't commit to this [House/Business/Move] right now, we’re failing our future family. Don't be a dream-killer."	"A future built on pressure is a house of cards. I move at the speed of safety, not the speed of your urgency."
77	The Spiritual Enforcer	"The Universe/God told me we’re meant to be. Resisting this connection is you resisting your own destiny."	"I am the primary interpreter of my own path. If it isn't a 'Yes' in my spirit, it isn't 'The Universe' speaking."
78	The Triangulation Buffer	"She’s just my 'best friend.' You’re being insecure. Why do you have to be so 'traditional' and jealous?"	"I don't compete for a seat at the table. If your 'friendships' mimic romance, I am not the problem; your boundaries are."
79	Proxy Shame	"How can you be so happy/successful when you see me struggling like this? It’s like you don't even care."	"I can be empathetic without being a martyr. My joy is not a betrayal of your struggle."
80	The Final Seal	"After all the training and 'analyst' skills you’ve learned, you’re really just going to walk away?"	"Walking away is the ultimate analyst skill. I’ve analyzed the data, and the data says my peace is non-negotiable."`;

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Clear existing questions
    const existingQuestions = await ctx.db.query("questions").collect();
    for (const q of existingQuestions) {
      await ctx.db.delete(q._id);
    }

    // 2. Clear existing tactics
    const existingTactics = await ctx.db.query("tactics").collect();
    for (const t of existingTactics) {
      await ctx.db.delete(t._id);
    }

    // 3. Seed Tactics
    const tacticLines = rawTactics.split("\n");
    for (const line of tacticLines) {
      if (!line.trim()) continue;
      const [idStr, title, language, boundary] = line.split("\t");
      const tacticId = parseInt(idStr);
      
      await ctx.db.insert("tactics", {
        tacticId,
        title,
        description: language,
        category: "Relationship Strategy",
        fullContent: boundary,
        isStarter: tacticId <= 10,
      });
    }

    // 4. Seed Questions
    const lines = rawQuestions.split("\n");
    for (const line of lines) {
      if (!line.trim()) continue;
      const [category, idStr, text, healthy, potential, redFlag] = line.split("\t");
      const questionId = parseInt(idStr);
      
      await ctx.db.insert("questions", {
        questionId,
        text,
        category,
        order: questionId,
        healthySign: healthy,
        potentialConcern: potential,
        redFlag: redFlag,
      });
    }
  },
});
