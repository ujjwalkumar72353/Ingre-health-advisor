import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiUpload, FiX, FiCheck, FiHome, FiInfo, FiMail, FiUser, FiMapPin } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
const diseases = [
  // Existing diseases (70)
  "Acne", "Allergies", "Alzheimer's Disease", "Anemia", "Anxiety Disorders", "Arthritis", "Asthma",
  "Bacterial Infections", "Bipolar Disorder", "Bronchitis", "Cancer", "Celiac Disease", "Chickenpox",
  "Common Cold", "Conjunctivitis", "COPD", "COVID-19", "Crohn's Disease", "Depression", "Diabetes",
  "Eczema", "Epilepsy", "Fibromyalgia", "Flu", "Gastroenteritis", "GERD", "Gout", "Heart Disease",
  "Hepatitis", "Herpes", "HIV/AIDS", "Hypertension", "Hypothyroidism", "IBS", "Influenza", "Insomnia",
  "Kidney Disease", "Leukemia", "Lupus", "Lyme Disease", "Malaria", "Measles", "Meningitis", "Migraines",
  "Multiple Sclerosis", "Mumps", "Osteoporosis", "Parkinson's Disease", "Pneumonia", "Psoriasis",
  "Rabies", "Rheumatoid Arthritis", "Rubella", "Scabies", "Schizophrenia", "Shingles", "Sinusitis",
  "Strep Throat", "Stroke", "Syphilis", "Tetanus", "Tuberculosis", "Ulcers", "Urinary Tract Infections",
  "Varicose Veins", "Viral Infections", "Whooping Cough", "Yellow Fever", "Zika Virus", 
  "Alopecia", "Anorexia", "Appendicitis", "Atherosclerosis", "Autism", "Bell's Palsy", "Bursitis",
  "Cataracts", "Cerebral Palsy", "Cholera", "Chronic Fatigue Syndrome", "Cirrhosis", "Cystic Fibrosis",
  "Dengue Fever", "Dermatitis", "Diverticulitis", "Down Syndrome", "Dyslexia", "Endometriosis",
  "Fibroids", "Gallstones", "Glaucoma", "Gonorrhea", "Graves' Disease", "Hemophilia", "Hemorrhoids",
  "Huntington's Disease", "Hydrocephalus", "Hyperthyroidism", "Impetigo", "Jaundice", "Laryngitis",

  // Additional diseases (930)
  "Achalasia", "Acid Reflux", "Actinic Keratosis", "Addison's Disease", "Adenomyosis", "ADHD", 
  "Adrenal Fatigue", "Agoraphobia", "Alcoholism", "Allergic Rhinitis", "Altitude Sickness", 
  "Amyloidosis", "Amyotrophic Lateral Sclerosis", "Anaphylaxis", "Angioedema", "Ankylosing Spondylitis",
  "Anosmia", "Anthrax", "Aortic Aneurysm", "Aplastic Anemia", "Apraxia", "Arrhythmia", "Asbestosis",
  "Asperger Syndrome", "Astigmatism", "Ataxia", "Athlete's Foot", "Atrial Fibrillation", "Autism Spectrum Disorder",
  "Avian Influenza", "Babesiosis", "Back Pain", "Bacterial Vaginosis", "Baker's Cyst", "Barrett's Esophagus",
  "Bedsores", "Behcet's Disease", "Beriberi", "Binge Eating Disorder", "Black Death", "Bladder Cancer",
  "Blepharitis", "Body Dysmorphic Disorder", "Boils", "Bone Cancer", "Borderline Personality Disorder",
  "Botulism", "Brain Aneurysm", "Brain Tumor", "Breast Cancer", "Bronchiectasis", "Brucellosis",
  "Bulimia Nervosa", "Bunion", "Burkitt's Lymphoma", "Burn Injuries", "C. difficile Infection",
  "Cachexia", "Calciphylaxis", "Campylobacteriosis", "Candidiasis", "Carbon Monoxide Poisoning",
  "Carcinoid Syndrome", "Cardiomyopathy", "Carpal Tunnel Syndrome", "Cat Scratch Disease", "Cataracts",
  "Cellulitis", "Cervical Cancer", "Cervical Dysplasia", "Chagas Disease", "Charcot-Marie-Tooth Disease",
  "Chemotherapy Side Effects", "Chikungunya", "Chlamydia", "Cholecystitis", "Chronic Kidney Disease",
  "Chronic Lymphocytic Leukemia", "Chronic Myeloid Leukemia", "Chronic Pain", "Chronic Pancreatitis",
  "Claustrophobia", "Cluster Headaches", "Coagulation Disorders", "Cold Sores", "Colic", "Colon Cancer",
  "Color Blindness", "Common Variable Immunodeficiency", "Concussion", "Congenital Heart Defects",
  "Conjoined Twins", "Constipation", "Coronary Artery Disease", "Creutzfeldt-Jakob Disease", "Crohn's Disease",
  "Croup", "Cryptococcosis", "Cryptosporidiosis", "Cushing's Syndrome", "Cutaneous Lupus", "Cyclothymia",
  "Cysticercosis", "Cytomegalovirus", "De Quervain's Tenosynovitis", "Deep Vein Thrombosis", "Dehydration",
  "Delirium", "Dementia", "Dengue Hemorrhagic Fever", "Dental Caries", "Depersonalization Disorder",
  "Dermatomyositis", "Diabetic Neuropathy", "Diabetic Retinopathy", "Diphtheria", "Discoid Eczema",
  "Dissociative Identity Disorder", "Diverticulosis", "Dizziness", "Double Jointedness", "Dry Eye Syndrome",
  "Dry Mouth", "Dupuytren's Contracture", "Dysautonomia", "Dyscalculia", "Dysgraphia", "Dyshidrosis",
  "Dysmenorrhea", "Dyspareunia", "Dysphagia", "Dysthymia", "Dystonia", "Ear Infection", "Ebola Virus Disease",
  "Ectopic Pregnancy", "Eczema Herpeticum", "Edema", "Ehlers-Danlos Syndrome", "Eisenmenger Syndrome",
  "Emphysema", "Encephalitis", "Encephalopathy", "Endocarditis", "Endometrial Cancer", "Enterovirus",
  "Eosinophilic Esophagitis", "Epidermolysis Bullosa", "Epiglottitis", "Erectile Dysfunction", "Erysipelas",
  "Erythema Multiforme", "Erythema Nodosum", "Erythromelalgia", "Esophageal Cancer", "Essential Tremor",
  "Ewing Sarcoma", "Exophthalmos", "Eye Floaters", "Fabry Disease", "Familial Hypercholesterolemia",
  "Familial Mediterranean Fever", "Fanconi Anemia", "Farber's Disease", "Fascioliasis", "Fatty Liver Disease",
  "Fetal Alcohol Syndrome", "Fibrodysplasia Ossificans Progressiva", "Fifth Disease", "Filariasis",
  "Flat Feet", "Folliculitis", "Food Poisoning", "Fragile X Syndrome", "Frostbite", "Frozen Shoulder",
  "Fuchs' Dystrophy", "Functional Neurological Disorder", "Fungal Infections", "Gallbladder Cancer",
  "Ganglion Cyst", "Gangrene", "Gastritis", "Gastroesophageal Reflux Disease", "Gaucher Disease",
  "Gender Dysphoria", "Generalized Anxiety Disorder", "Genital Herpes", "Genital Warts", "Gestational Diabetes",
  "Giant Cell Arteritis", "Giardiasis", "Gilbert's Syndrome", "Gingivitis", "Glomerulonephritis",
  "Glossitis", "Gluten Sensitivity", "Goiter", "Goodpasture Syndrome", "Gout", "Granuloma Annulare",
  "Graves' Disease", "Guillain-Barré Syndrome", "Gum Disease", "H1N1 Influenza", "Hair Loss", "Hantavirus",
  "Hashimoto's Thyroiditis", "Head Lice", "Hearing Loss", "Heart Attack", "Heart Failure", "Heat Stroke",
  "Heavy Metal Poisoning", "Hemangioma", "Hematuria", "Hemochromatosis", "Hemolytic Uremic Syndrome",
  "Hemorrhagic Fever", "Henoch-Schönlein Purpura", "Hepatitis A", "Hepatitis B", "Hepatitis C",
  "Hepatitis D", "Hepatitis E", "Hereditary Angioedema", "Hernia", "Herpangina", "Hiccups", "Hidradenitis Suppurativa",
  "High Cholesterol", "Hirsutism", "Histoplasmosis", "Hives", "Hodgkin's Lymphoma", "Horner's Syndrome",
  "Huntington's Disease", "Hydrocele", "Hydronephrosis", "Hyperaldosteronism", "Hypercalcemia",
  "Hyperemesis Gravidarum", "Hyperhidrosis", "Hyperlipidemia", "Hyperparathyroidism", "Hypersomnia",
  "Hypertension", "Hyperthermia", "Hypertrophic Cardiomyopathy", "Hypocalcemia", "Hypochondria",
  "Hypoglycemia", "Hypogonadism", "Hypokalemia", "Hyponatremia", "Hypoparathyroidism", "Hypopituitarism",
  "Hypothermia", "Hypotonia", "Ichthyosis", "Idiopathic Intracranial Hypertension", "Idiopathic Pulmonary Fibrosis",
  "IgA Nephropathy", "Impetigo", "Inclusion Body Myositis", "Infertility", "Inflammatory Bowel Disease",
  "Ingrown Toenail", "Insulin Resistance", "Interstitial Cystitis", "Intestinal Obstruction", "Iron Deficiency Anemia",
  "Irritable Bowel Syndrome", "Ischemic Colitis", "Jaundice", "Jock Itch", "Kaposi's Sarcoma", "Kawasaki Disease",
  "Keloids", "Keratitis", "Keratoconus", "Keratosis Pilaris", "Kidney Cancer", "Kidney Infection", "Kidney Stones",
  "Klinefelter Syndrome", "Korsakoff Syndrome", "Kwashiorkor", "Kyphosis", "Labyrinthitis", "Lactose Intolerance",
  "Lambert-Eaton Syndrome", "Laryngeal Cancer", "Laryngomalacia", "Lead Poisoning", "Legionnaires' Disease",
  "Leiomyosarcoma", "Leishmaniasis", "Leprosy", "Leptospirosis", "Lewy Body Dementia", "Lichen Planus",
  "Lichen Sclerosus", "Lipoma", "Listeriosis", "Liver Cancer", "Lockjaw", "Long COVID", "Lou Gehrig's Disease",
  "Low Blood Pressure", "Lung Cancer", "Lupus Nephritis", "Lyme Disease", "Lymphadenitis", "Lymphangioleiomyomatosis",
  "Lymphedema", "Lymphoma", "Macular Degeneration", "Mad Cow Disease", "Malabsorption Syndrome", "Malaria",
  "Malignant Hyperthermia", "Marburg Virus Disease", "Marfan Syndrome", "Mastitis", "Mastocytosis",
  "Measles", "Meckel's Diverticulum", "Mediterranean Fever", "Melanoma", "Ménière's Disease", "Meningioma",
  "Meningococcemia", "Menopause", "Menorrhagia", "Mercury Poisoning", "Mesothelioma", "Metabolic Syndrome",
  "Metatarsalgia", "Microcephaly", "Migraine", "Mild Cognitive Impairment", "Mitral Valve Prolapse",
  "Molluscum Contagiosum", "Mononucleosis", "Motion Sickness", "Motor Neuron Disease", "Mouth Ulcers",
  "Moyamoya Disease", "MRSA", "Multiple Endocrine Neoplasia", "Multiple Myeloma", "Multiple System Atrophy",
  "Mumps", "Muscular Dystrophy", "Myasthenia Gravis", "Mycoplasma Infection", "Myelodysplastic Syndromes",
  "Myelofibrosis", "Myocardial Infarction", "Myocarditis", "Myoclonus", "Myofascial Pain Syndrome",
  "Myopia", "Myositis", "Narcolepsy", "Necrotizing Fasciitis", "Neonatal Jaundice", "Nephrotic Syndrome",
  "Neuroblastoma", "Neurofibromatosis", "Neuroleptic Malignant Syndrome", "Neuromyelitis Optica",
  "Neuropathy", "Neutropenia", "Niemann-Pick Disease", "Night Blindness", "Night Terrors", "Norovirus",
  "Nosocomial Infections", "Obesity", "Obsessive-Compulsive Disorder", "Obstructive Sleep Apnea",
  "Ocular Hypertension", "Oligodendroglioma", "Onychomycosis", "Optic Neuritis", "Oral Thrush", "Orchitis",
  "Orthostatic Hypotension", "Osgood-Schlatter Disease", "Osteoarthritis", "Osteogenesis Imperfecta",
  "Osteomalacia", "Osteomyelitis", "Osteosarcoma", "Otitis Externa", "Otitis Media", "Ovarian Cancer",
  "Ovarian Cysts", "Paget's Disease", "Pancreatic Cancer", "Pancreatitis", "Panic Disorder", "Paraganglioma",
  "Paralysis", "Paranoid Personality Disorder", "Paraplegia", "Parkinsonism", "Paronychia", "Paroxysmal Nocturnal Hemoglobinuria",
  "PCOS", "Pediculosis", "Pellagra", "Pemphigus", "Peptic Ulcer", "Pericarditis", "Periodontal Disease",
  "Peripheral Artery Disease", "Peritonitis", "Pertussis", "Peyronie's Disease", "Phantom Limb Pain",
  "Phenylketonuria", "Phlebitis", "Photodermatitis", "Pica", "Piles", "Pilonidal Cyst", "Pinworms",
  "Pituitary Tumors", "Placenta Previa", "Plague", "Plantar Fasciitis", "Pleurisy", "Pneumoconiosis",
  "Pneumocystis Pneumonia", "Pneumothorax", "Polio", "Polyarteritis Nodosa", "Polycystic Kidney Disease",
  "Polycythemia Vera", "Polymyalgia Rheumatica", "Polymyositis", "Porphyria", "Post-Traumatic Stress Disorder",
  "Postpartum Depression", "Prader-Willi Syndrome", "Pre-eclampsia", "Premature Ejaculation", "Premenstrual Dysphoric Disorder",
  "Presbyopia", "Primary Biliary Cholangitis", "Primary Sclerosing Cholangitis", "Progeria", "Prostate Cancer",
  "Prostatitis", "Proteinuria", "Pruritus", "Pseudogout", "Pseudomembranous Colitis", "Psittacosis",
  "Psoriatic Arthritis", "Pulmonary Edema", "Pulmonary Embolism", "Pulmonary Fibrosis", "Pulmonary Hypertension",
  "Pyloric Stenosis", "Q Fever", "Rabies", "Radiation Sickness", "Ramsay Hunt Syndrome", "Raynaud's Disease",
  "Reactive Arthritis", "Rectal Prolapse", "Reflex Sympathetic Dystrophy", "Renal Cell Carcinoma",
  "Restless Legs Syndrome", "Retinitis Pigmentosa", "Retinoblastoma", "Rett Syndrome", "Reye Syndrome",
  "Rheumatic Fever", "Rhinitis", "Ringworm", "Rocky Mountain Spotted Fever", "Rosacea", "Roseola",
  "Rotator Cuff Injury", "Roundworms", "Rubella", "Rubeola", "Salmonella", "Sarcoidosis", "Scabies",
  "Scarlet Fever", "Schistosomiasis", "Schizoaffective Disorder", "Schizophrenia", "Sciatica",
  "Scleroderma", "Scoliosis", "Seborrheic Dermatitis", "Seizure Disorders", "Sepsis", "Septic Arthritis",
  "Serotonin Syndrome", "Severe Acute Respiratory Syndrome", "Sexually Transmitted Infections", "Shigellosis",
  "Shin Splints", "Short Bowel Syndrome", "Sickle Cell Disease", "Sjögren's Syndrome", "Skin Cancer",
  "Sleep Apnea", "Sleep Paralysis", "Smallpox", "Snake Bites", "Social Anxiety Disorder", "Somatic Symptom Disorder",
  "Spina Bifida", "Spinal Muscular Atrophy", "Splenomegaly", "Spondylitis", "Spondylolisthesis",
  "Spontaneous Coronary Artery Dissection", "Squamous Cell Carcinoma", "Staphylococcal Infections",
  "Stevens-Johnson Syndrome", "Stomach Cancer", "Strabismus", "Strep Throat", "Stress Incontinence",
  "Stroke", "Sturge-Weber Syndrome", "Stye", "Subarachnoid Hemorrhage", "Substance Abuse Disorders",
  "Sudden Infant Death Syndrome", "Sunburn", "Superior Vena Cava Syndrome", "Swine Flu", "Syncope",
  "Syphilis", "Systemic Lupus Erythematosus", "Taeniasis", "Takayasu's Arteritis", "Tapeworm Infection",
  "Tardive Dyskinesia", "Tay-Sachs Disease", "Temporomandibular Joint Disorder", "Tendinitis", "Tennis Elbow",
  "Testicular Cancer", "Tetanus", "Tetralogy of Fallot", "Thalassemia", "Thoracic Outlet Syndrome",
  "Thrombocytopenia", "Thrombophlebitis", "Thrush", "Thyroid Cancer", "Tic Douloureux", "Tinea Capitis",
  "Tinea Versicolor", "Tinnitus", "Tourette Syndrome", "Toxic Shock Syndrome", "Toxoplasmosis",
  "Trachoma", "Transient Ischemic Attack", "Transverse Myelitis", "Trichinosis", "Trichomoniasis",
  "Trigeminal Neuralgia", "Trigger Finger", "Triple X Syndrome", "Tropical Sprue", "Tuberculosis",
  "Tuberous Sclerosis", "Tularemia", "Turner Syndrome", "Type 1 Diabetes", "Type 2 Diabetes",
  "Typhoid Fever", "Typhus", "Ulcerative Colitis", "Umbilical Hernia", "Uremia", "Urethritis",
  "Urinary Incontinence", "Uterine Fibroids", "Uveitis", "Vaginal Yeast Infection", "Varicocele",
  "Vasculitis", "Ventricular Fibrillation", "Vertigo", "Vitiligo", "Von Hippel-Lindau Disease",
  "Von Willebrand Disease", "Vulvodynia", "Waldenström Macroglobulinemia", "Warts", "Wegener's Granulomatosis",
  "West Nile Virus", "Wheat Allergy", "Whipple's Disease", "Williams Syndrome", "Wilson's Disease",
  "Wolf-Hirschhorn Syndrome", "Wolff-Parkinson-White Syndrome", "Xeroderma Pigmentosum", "Xerostomia",
  "Yellow Nail Syndrome", "Yersiniosis", "Zika Virus", "Zollinger-Ellison Syndrome"
];
const recommendations = {
  general: [
    'Increase intake of leafy greens',
    'Stay hydrated with at least 8 glasses of water daily',
    'Engage in 30 minutes of moderate exercise daily',
    'Get 7-9 hours of quality sleep each night',
    'Reduce processed food consumption'
  ],
  diabetes: [
    'Limit sugar intake to less than 25g per day',
    'Monitor blood glucose levels regularly',
    'Choose complex carbohydrates over simple sugars',
    'Maintain consistent meal times',
    'Be cautious with fruit consumption'
  ],
  hypertension: [
    'Reduce sodium intake to less than 2,300mg daily',
    'Increase potassium-rich foods like bananas and spinach',
    'Limit alcohol consumption',
    'Practice stress-reduction techniques',
    'Monitor blood pressure regularly'
  ],
  heart: [
    'Reduce saturated and trans fats',
    'Increase omega-3 fatty acids from fish or flaxseeds',
    'Limit red meat consumption',
    'Choose lean protein sources',
    'Incorporate more soluble fiber'
  ]
};

const HealthAdvisor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = diseases.filter(disease =>
        disease.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(disease => !selectedDiseases.includes(disease));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, selectedDiseases]);

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleDiseaseSelect = (disease) => {
    if (!selectedDiseases.includes(disease)) {
      setSelectedDiseases([...selectedDiseases, disease]);
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  const removeDisease = (diseaseToRemove) => {
    setSelectedDiseases(selectedDiseases.filter(disease => disease !== diseaseToRemove));
  };

  const handleImageChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(null);
      return;
    }
    setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (selectedDiseases.length === 0 && !image) {
      alert('Please select at least one disease or upload an image');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const hasDiabetes = selectedDiseases.includes('Diabetes');
      const hasHypertension = selectedDiseases.includes('Hypertension');
      const hasHeartDisease = selectedDiseases.includes('Heart Disease');
      
      const mockResponse = {
        status: 'success',
        message: 'Analysis complete',
        recommendations: [
          ...recommendations.general,
          ...(hasDiabetes ? recommendations.diabetes : []),
          ...(hasHypertension ? recommendations.hypertension : []),
          ...(hasHeartDisease ? recommendations.heart : [])
        ].slice(0, 5),
        warnings: hasDiabetes ? 
          ['High sugar content detected in product'] : 
          hasHypertension ? 
          ['High sodium content detected'] :
          []
      };
      
      setResult(mockResponse);
      setIsSubmitting(false);
    }, 2000);
  };

  const resetForm = () => {
    setSelectedDiseases([]);
    setImage(null);
    setResult(null);
  };

  const getRandomRecommendations = () => {
    const randomIndexes = [];
    while (randomIndexes.length < 3) {
      const r = Math.floor(Math.random() * recommendations.general.length);
      if (randomIndexes.indexOf(r) === -1) randomIndexes.push(r);
    }
    return randomIndexes.map(i => recommendations.general[i]);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <motion.div 
            className="logo-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="logo-icon-container">
              <FiCheck className="logo-icon" />
            </div>
            <h1 className="app-title">Ingre Health Advisor</h1>
          </motion.div>
          
          <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
            <button 
              onClick={() => {
                setActiveTab('home');
                setIsMenuOpen(false);
              }}
              className={`nav-button ${activeTab === 'home' ? 'active' : ''}`}
            >
              <FiHome className="nav-icon" /> Home
            </button>
            <button 
              onClick={() => {
                setActiveTab('about');
                setIsMenuOpen(false);
              }}
              className={`nav-button ${activeTab === 'about' ? 'active' : ''}`}
            >
              <FiInfo className="nav-icon" /> About
            </button>
            <button 
              onClick={() => {
                setActiveTab('contact');
                setIsMenuOpen(false);
              }}
              className={`nav-button ${activeTab === 'contact' ? 'active' : ''}`}
            >
              <FiMail className="nav-icon" /> Contact
            </button>
          </nav>
          
          <button 
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      <main className="main-content">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="home-container"
            >
              <div className="hero-section">
                <motion.h2 
                  className="hero-title"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Smart Nutrition for Better Health
                </motion.h2>
                <motion.p 
                  className="hero-subtitle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Scan food labels or select your health conditions to get personalized recommendations
                </motion.p>
              </div>

              <motion.div 
                className="form-card"
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="form-section">
                  <label className="input-label" htmlFor="disease-search">
                    Search for Health Conditions
                  </label>
                  <div className="search-container">
                    <input
                      id="disease-search"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Type to search diseases..."
                      className="search-input"
                    />
                    <FiSearch className="search-icon" />
                  </div>
                  {suggestions.length > 0 && (
                    <motion.ul 
                      className="suggestions-list"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {suggestions.map((disease, index) => (
                        <motion.li
                          key={index}
                          onClick={() => handleDiseaseSelect(disease)}
                          className="suggestion-item"
                          whileHover={{ scale: 1.02, backgroundColor: '#f0fdf4' }}
                        >
                          {disease}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </div>

                {selectedDiseases.length > 0 && (
                  <motion.div 
                    className="selected-diseases-section"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="section-title">Selected Conditions:</h3>
                    <div className="disease-chips">
                      {selectedDiseases.map((disease, index) => (
                        <motion.span
                          key={index}
                          className="disease-chip"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {disease}
                          <button
                            onClick={() => removeDisease(disease)}
                            className="remove-chip-button"
                            whileHover={{ scale: 1.1 }}
                          >
                            <FiX className="remove-chip-icon" />
                          </button>
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div className="upload-section">
                  <label className="input-label">
                    Upload Food Label Image
                  </label>
                  <motion.div
                    onClick={() => fileInputRef.current.click()}
                    className="upload-area"
                    whileHover={{ borderColor: '#10b981' }}
                  >
                    {preview ? (
                      <div className="image-preview-container">
                        <img 
                          src={preview} 
                          alt="Preview" 
                          className="image-preview" 
                          onLoad={(e) => {
                            // Ensure image fits container
                            const img = e.target;
                            const ratio = img.naturalWidth / img.naturalHeight;
                            if (ratio > 1) {
                              img.style.width = '100%';
                              img.style.height = 'auto';
                            } else {
                              img.style.width = 'auto';
                              img.style.height = '100%';
                            }
                          }}
                        />
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            setImage(null);
                          }}
                          className="remove-image-button"
                          whileHover={{ scale: 1.1 }}
                        >
                          <FiX className="remove-image-icon" />
                        </motion.button>
                      </div>
                    ) : (
                      <>
                        <FiUpload className="upload-icon" />
                        <p className="upload-text">Click to upload or drag and drop</p>
                        <p className="upload-subtext">PNG, JPG up to 5MB</p>
                      </>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="file-input"
                    />
                  </motion.div>
                </div>

                <div className="submit-section">
                  {!result ? (
                    <motion.button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner"></span>
                          Analyzing...
                        </>
                      ) : (
                        'Get Recommendations'
                      )}
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={resetForm}
                      className="new-analysis-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start New Analysis
                    </motion.button>
                  )}
                </div>
              </motion.div>

              {result && (
                <motion.div 
                  className="results-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="results-title">Analysis Results</h3>
                  
                  <div className="recommendations-section">
                    <h4 className="section-title">Recommendations:</h4>
                    <ul className="recommendations-list">
                      {result.recommendations.map((item, index) => (
                        <motion.li 
                          key={index} 
                          className="recommendation-item"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <FiCheck className="recommendation-icon" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {result.warnings.length > 0 && (
                    <motion.div 
                      className="warnings-section"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h4 className="section-title">Warnings:</h4>
                      <ul className="warnings-list">
                        {result.warnings.map((warning, index) => (
                          <motion.li 
                            key={index} 
                            className="warning-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                          >
                            <FiX className="warning-icon" />
                            <span>{warning}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {!result && (
                <motion.div 
                  className="tips-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <h3 className="tips-title">Nutrition Tips</h3>
                  <div className="tips-grid">
                    {getRandomRecommendations().map((tip, index) => (
                      <motion.div 
                        key={index}
                        className="tip-card"
                        whileHover={{ y: -5 }}
                      >
                        <div className="tip-number">{index + 1}</div>
                        <p className="tip-text">{tip}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="about-container"
            >
              <motion.h2 
                className="about-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                About Ingre Health Advisor
              </motion.h2>
              
              <div className="about-content">
                <motion.p 
                  className="about-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  In today's fast-paced world, consumers are becoming increasingly conscious about their health and the food they consume. However, understanding the nutritional information provided on food packaging can be confusing and time-consuming.
                </motion.p>
                
                <motion.p 
                  className="about-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  The <strong>Ingre Health Advisor</strong> aims to address this challenge by providing an easy-to-use solution that scans the backside of packaged food and evaluates how beneficial the ingredients are for an individual. By leveraging advanced scanning technologies and nutritional databases, this project seeks to empower users to make informed food choices that align with their health goals.
                </motion.p>
                
                <motion.h3 
                  className="section-heading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Our Technology
                </motion.h3>
                
                <div className="technology-grid">
                  <motion.div 
                    className="technology-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="tech-icon-container">
                      <svg className="tech-icon" viewBox="0 0 24 24">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                    </div>
                    <h4 className="technology-title">AI-Powered Analysis</h4>
                    <p className="technology-text">
                      Our system uses advanced machine learning algorithms to analyze nutritional information and provide personalized recommendations based on your health conditions.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="technology-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="tech-icon-container">
                      <svg className="tech-icon" viewBox="0 0 24 24">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                    </div>
                    <h4 className="technology-title">Image Processing</h4>
                    <p className="technology-text">
                      We use state-of-the-art OCR (Optical Character Recognition) technology to extract text from food labels with high accuracy, even under challenging conditions.
                    </p>
                  </motion.div>
                </div>
                
                <motion.h3 
                  className="section-heading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  The Team
                </motion.h3>
                
                <div className="team-grid">
  <motion.div 
    className="team-member"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.9 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="member-avatar">
      <img 
        src="/images/anish.jpeg" 
        alt="Anish Raj"
        className="member-image"
      />
    </div>
    <p className="member-name">Anish Raj</p>
    <p className="member-id">2112009</p>
  </motion.div>
  <motion.div 
    className="team-member"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1.0 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="member-avatar">
      <img 
        src="/images/amlan.jpeg" 
        alt="Amlan Mohapatra"
        className="member-image"
      />
    </div>
    <p className="member-name">Amlan Mohapatra</p>
    <p className="member-id">2112032</p>
  </motion.div>
  <motion.div 
    className="team-member"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1.1 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="member-avatar">
      <img 
        src="/images/ujjwal.jpeg" 
        alt="Ujjwal Kumar"
        className="member-image"
      />
    </div>
    <p className="member-name">Ujjwal Kumar</p>
    <p className="member-id">2112079</p>
  </motion.div>
  <motion.div 
    className="team-member"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1.2 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="member-avatar">
      <img 
        src="/images/yash.jpeg" 
        alt="Yash Raj"
        className="member-image"
      />
    </div>
    <p className="member-name">Yash Raj</p>
    <p className="member-id">2112047</p>
  </motion.div>
    </div>
                
    <motion.div 
  className="guidance-section"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.3 }}
>
  <div className="guidance-content">
    <div className="guide-avatar">
      <img 
        src="/images/dolendro_sir.jpeg" 
        alt="Dr. L. Dolendro Singh"
        className="guide-image"
      />
    </div>
    <div className="guide-info">
      <h4 className="guidance-title">Under the Guidance of</h4>
      <p className="guidance-text">Dr. L. Dolendro Singh</p>
      <p className="guidance-text">Dept. of CSE, NIT SILCHAR</p>
    </div>
  </div>
</motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="contact-container"
            >
              <motion.h2 
                className="contact-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Contact Us
              </motion.h2>
              
              <div className="contact-grid">
                <motion.div 
                  className="contact-info"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="section-heading">Get in Touch</h3>
                  
                  <div className="contact-items">
                    <motion.div 
                      className="contact-item"
                      whileHover={{ x: 5 }}
                    >
                      <div className="contact-icon-container">
                        <FiMail className="contact-icon" />
                      </div>
                      <div>
                        <h4 className="contact-item-title">Email</h4>
                        <p className="contact-item-text">contact@ingrehealthadvisor.com</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="contact-item"
                      whileHover={{ x: 5 }}
                    >
                      <div className="contact-icon-container">
                        <FiMapPin className="contact-icon" />
                      </div>
                      <div>
                        <h4 className="contact-item-title">Address</h4>
                        <p className="contact-item-text">Department of Computer Science & Engineering</p>
                        <p className="contact-item-text">NIT Silchar, Assam, India - 788010</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="contact-form-container"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="section-heading">Send Us a Message</h3>
                  
                  <form className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" id="name" className="form-input" />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" id="email" className="form-input" />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea id="message" rows="4" className="form-textarea"></textarea>
                    </div>
                    
                    <motion.button 
                      type="submit" 
                      className="form-submit-button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Message
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-grid">
            <motion.div 
              className="footer-about"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="footer-heading">Ingre Health Advisor</h3>
              <p className="footer-text">Empowering you to make informed food choices for a healthier lifestyle.</p>
            </motion.div>
            
            <motion.div 
              className="footer-links"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-list">
                <li><button onClick={() => setActiveTab('home')} className="footer-link">Home</button></li>
                <li><button onClick={() => setActiveTab('about')} className="footer-link">About</button></li>
                <li><button onClick={() => setActiveTab('contact')} className="footer-link">Contact</button></li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="footer-tech"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="footer-heading">Technology</h4>
              <ul className="footer-list">
                <li className="footer-text">React.js</li>
                <li className="footer-text">Machine Learning</li>
                <li className="footer-text">OCR Technology</li>
                <li className="footer-text">Node.js</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="footer-social"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="footer-heading">Connect With Us</h4>
              <div className="social-icons">
                <motion.a 
                  href="#" 
                  className="social-icon"
                  whileHover={{ y: -3 }}
                >
                  <span className="sr-only">Facebook</span>
                  <FaFacebook className="icon" />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-icon"
                  whileHover={{ y: -3 }}
                >
                  <span className="sr-only">Twitter</span>
                  <FaTwitter className="icon" />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-icon"
                  whileHover={{ y: -3 }}
                >
                  <span className="sr-only">GitHub</span>
                  <FaGithub className="icon" />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-icon"
                  whileHover={{ y: -3 }}
                >
                  <span className="sr-only">LinkedIn</span>
                  <FaLinkedin className="icon" />
                </motion.a>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p>&copy; {new Date().getFullYear()} Ingre Health Advisor. All rights reserved.</p>
            <p className="footer-credits">B.Tech Project - Group 22, NIT Silchar</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default HealthAdvisor;