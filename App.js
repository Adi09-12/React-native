import "./global.css";
import { StatusBar } from 'expo-status-bar';
import { Text, View, ImageBackground, TouchableOpacity, Animated, Dimensions, TextInput, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';


import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CONTENT_WIDTH = '91%';



// --- Helper Components ---

const RoleButton = ({ title, subtitle, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={{
      flex: 1,
      minHeight: 110,
      backgroundColor: 'rgba(248, 250, 252, 0.1)',
      borderWidth: 1,
      borderColor: '#FFFFFF',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
    }}
  >
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      <Text style={{
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 22,
        color: '#FFFFFF',
        textAlign: 'center'
      }} numberOfLines={2}>{title}</Text>
      <Text style={{
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 11,
        lineHeight: 14,
        color: '#FFFFFF',
        textAlign: 'center'
      }} numberOfLines={3}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);



// --- Auth Input Component ---

const AuthInput = ({ label, placeholder, isPassword, isError, value, onChangeText, keyboardType, iconName }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ gap: 8, width: '100%' }}>
      <Text style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 17, color: '#111827' }}>{label}</Text>
      <View style={{
        height: 56,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: isError ? '#CA3A52' : (label === 'Email Address' ? '#432C81' : '#E5E7EB'),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
      }}>
        <Ionicons name={iconName} size={24} color="#1D202F" style={{ marginRight: 8, opacity: 0.8 }} />
        <TextInput
          style={{ flex: 1, color: '#111827', fontSize: 16, fontWeight: '600', height: '100%', outlineStyle: 'none' }}
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          secureTextEntry={isPassword && !showPassword}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize="none"
          selectionColor="#432C81"
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="#6B7280"
              style={{ opacity: 0.8 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// --- SignIn Screen ---

const SignInScreen = ({ onSignUpClick, onSignIn, onBack }) => {
  const [email, setEmail] = useState('dco@gmail.com');
  const [password, setPassword] = useState('password123');
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" />

      <View style={{ position: 'absolute', top: insets.top + 16, left: '4.5%', zIndex: 10 }}>
        <TouchableOpacity
          onPress={onBack}
          style={{ width: 48, height: 48, backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 7, alignItems: 'center', justifyContent: 'center' }}
        >
          <Ionicons name="chevron-back-outline" size={24} color="#1D202F" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingHorizontal: '4.5%', paddingTop: insets.top + 80, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ width: 48, height: 48, backgroundColor: '#000000', borderRadius: 0, marginBottom: 32, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 6, height: 6, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 0 }} />
          </View>

          <View style={{ alignItems: 'center', marginBottom: 40, width: '100%' }}>
            <Text style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: 24, lineHeight: 29, color: '#111827', textAlign: 'center', marginBottom: 12 }}>
              Sign In
            </Text>
            <Text style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: 16, lineHeight: 19, color: '#6B7280', textAlign: 'center' }}>
              Control your schedule with precision
            </Text>
          </View>

          <View style={{ width: '100%', gap: 24 }}>
            <AuthInput
              label="Email Address"
              placeholder="Enter your email..."
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              iconName="mail-outline"
            />
            <AuthInput
              label="Password"
              placeholder="Enter your password..."
              isPassword
              value={password}
              onChangeText={setPassword}
              iconName="lock-closed-outline"
            />
            <TouchableOpacity
              onPress={onSignIn}
              style={{ height: 56, backgroundColor: '#432C81', borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 14 }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', lineHeight: 19 }}>Sign In</Text>
              <Ionicons name="arrow-forward-outline" size={20} color="white" />
            </TouchableOpacity>

            <View style={{ height: 1, backgroundColor: '#E5E7EB', marginVertical: 8 }} />

            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity style={{ flex: 1, height: 56, backgroundColor: '#F3F4F6', borderRadius: 8, borderWidth: 0.5, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="logo-google" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, height: 56, backgroundColor: '#F3F4F6', borderRadius: 8, borderWidth: 0.5, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="logo-apple" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', gap: 12, marginTop: 12 }}>
              <TouchableOpacity onPress={onSignUpClick}>
                <Text style={{ color: '#6B7280', fontSize: 16, textAlign: 'center' }}>
                  Don’t have an account? <Text style={{ color: '#432C81' }}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
              <Text style={{ color: '#432C81', fontSize: 16, textAlign: 'center' }}>Forgot Password</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


// --- SignUp Screen ---

const SignUpScreen = ({ onSignInClick, onSignUp, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const insets = useSafeAreaInsets();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setError('ERROR: Password do not match!');
      return;
    }
    setError('');
    onSignUp();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" />

      <View style={{ position: 'absolute', top: insets.top + 16, left: '4.5%', zIndex: 10 }}>
        <TouchableOpacity
          onPress={onBack}
          style={{ width: 48, height: 48, backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 7, alignItems: 'center', justifyContent: 'center' }}
        >
          <Ionicons name="chevron-back-outline" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingHorizontal: '4.5%', paddingTop: insets.top + 80, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ width: 48, height: 48, backgroundColor: '#000000', borderRadius: 0, marginBottom: 32, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 6, height: 6, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 0 }} />
          </View>

          <View style={{ alignItems: 'center', marginBottom: 40, width: '100%' }}>
            <Text style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: 24, lineHeight: 29, color: '#111827', textAlign: 'center', marginBottom: 12 }}>
              Sign Up For Free.
            </Text>
            <Text style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: 16, lineHeight: 19, color: '#6B7280', textAlign: 'center' }}>
              Join us for less than 1 minute, with no cost.
            </Text>
          </View>

          <View style={{ width: '100%', gap: 16 }}>
            <View style={{ gap: 24 }}>
              <AuthInput
                label="Email Address"
                placeholder="Enter your email..."
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                iconName="mail-outline"
              />
              <AuthInput
                label="Password"
                placeholder="Enter your password..."
                isPassword
                value={password}
                onChangeText={setPassword}
                iconName="lock-closed-outline"
              />
              <AuthInput
                label="Password Confirmation"
                placeholder="Confirm your password..."
                isPassword
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                iconName="lock-closed-outline"
              />
            </View>

            {error ? (
              <Text style={{ color: '#CA3A52', fontSize: 14, fontFamily: 'Inter', textAlign: 'center', marginTop: -8 }}>{error}</Text>
            ) : null}

            <TouchableOpacity
              onPress={handleSignUp}
              style={{ height: 56, backgroundColor: '#432C81', borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 14, marginTop: 8 }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', lineHeight: 19 }}>Sign Up</Text>
              <Ionicons name="arrow-forward-outline" size={20} color="white" />
            </TouchableOpacity>

            <View style={{ height: 1, backgroundColor: '#E5E7EB', marginVertical: 8 }} />

            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity style={{ flex: 1, height: 56, backgroundColor: '#F3F4F6', borderRadius: 8, borderWidth: 0.5, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="logo-google" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, height: 56, backgroundColor: '#F3F4F6', borderRadius: 8, borderWidth: 0.5, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="logo-apple" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={onSignInClick} style={{ marginTop: 12 }}>
              <Text style={{ color: '#6B7280', fontSize: 16, textAlign: 'center' }}>
                Already have an account? <Text style={{ color: '#432C81' }}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


// --- KYC Screen ---

const KYCScreen = ({ onBack, onSubmit }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" />

      {/* Top Nav */}
      <View style={{ paddingTop: insets.top + 16, paddingHorizontal: '4.5%', flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <TouchableOpacity
          onPress={onBack}
          style={{ width: 48, height: 48, backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 7, alignItems: 'center', justifyContent: 'center' }}
        >
          <Ionicons name="chevron-back-outline" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: 24, lineHeight: 29, fontStyle: 'semibold', color: '#111827', flex: 1 }}>
          Doctor Registration
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: '4.5%', paddingBottom: insets.bottom + 16 }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{ gap: 24 }}>
            {/* Get Verified Card */}
            <View style={{ width: '100%', backgroundColor: 'rgba(125, 214, 103, 0.2)', borderRadius: 12, flexDirection: 'row', alignItems: 'center', padding: 15, gap: 15 }}>
              <View style={{ width: 56, height: 56, backgroundColor: '#7DD667', borderRadius: 28, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="shield-outline" size={24} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1, gap: 9 }}>
                <Text style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: 20, lineHeight: 24, color: '#111827' }}>
                  Get Verified
                </Text>
                <Text style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 18, color: '#6B7280' }}>
                  Verify your identity to gain a trust badge and increase your credibility with service providers.
                </Text>
              </View>
            </View>

            {/* Digilocker Button */}
            <TouchableOpacity style={{ width: '100%', height: 50, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#432C81', borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Ionicons name="person-circle-outline" size={20} color="#432C81" />
              <Text style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: 16, lineHeight: 19, color: '#432C81' }}>
                Verify with Digilocker
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 35, marginTop: 40 }}>
            <TouchableOpacity
              onPress={onSubmit}
              style={{ height: 56, backgroundColor: '#432C81', borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 14 }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', lineHeight: 19 }}>Submit</Text>
              <Ionicons name="arrow-forward-outline" size={24} color="white" />
            </TouchableOpacity>

            <Text style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 18, color: '#6B7280', textAlign: 'center' }}>
              By Proceeding forward, you agree to the <Text style={{ color: '#432C81' }}>Privacy Policy</Text> and <Text style={{ color: '#432C81' }}>Terms & Conditions</Text>
            </Text>
          </View>
        </View>
      </ScrollView>


      {/* Home Indicator Placeholder */}
      <View style={{ position: 'absolute', bottom: insets.bottom + 8, left: (SCREEN_WIDTH - 134) / 2, width: 134, height: 5, backgroundColor: '#1F2937', borderRadius: 2.5 }} />
    </View>
  );
};


// --- Profile Management Screen ---

const ProfileInput = ({ label, placeholder, multiline, height = 51, isDropdown, value, onChangeText }) => (
  <View style={{ width: '100%', gap: 8 }}>
    <Text style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 17, color: '#111827' }}>{label}</Text>
    <View style={{
      width: '100%',
      height: height,
      backgroundColor: '#F3F4F6',
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: multiline ? 'flex-start' : 'center',
      paddingHorizontal: 16,
      paddingVertical: multiline ? 16 : 0
    }}>
      <TextInput
        style={{ flex: 1, color: '#111827', fontSize: 16, fontWeight: '600', outlineStyle: 'none', textAlignVertical: multiline ? 'top' : 'center' }}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        multiline={multiline}
        value={value}
        onChangeText={onChangeText}
        editable={!isDropdown && label !== "Add Your Specialist"}
      />
      {isDropdown && <Ionicons name="chevron-down-outline" size={20} color="#1D202F" />}
    </View>
  </View>
);

const ProfileManagementScreen = ({ onBack, onOpenSearch, selectedCategory }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 40, paddingHorizontal: '4.5%', paddingTop: insets.top + 16 }}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 24, alignItems: 'center' }}>

          {/* Top Nav */}
          <View style={{ width: '100%', height: 48, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity
              onPress={onBack}
              style={{ width: 48, height: 48, backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 7, alignItems: 'center', justifyContent: 'center' }}
            >
              <Ionicons name="chevron-back-outline" size={24} color="#1F2937" />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: 20, lineHeight: 24, color: '#111827', flex: 1 }}>
              Profile Management
            </Text>
          </View>

          {/* Profile Pic Section */}
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 97, height: 84, backgroundColor: '#F3F4F6', borderStyle: 'dashed', borderWidth: 1, borderColor: '#6B7280', borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="add-circle" size={24} color="#6B7280" />
            </View>
            <View style={{ flex: 1, gap: 5 }}>
              <Text style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: 14, color: '#432C81', textDecorationLine: 'underline' }}>
                Dr. Megumin Black
              </Text>
              <Text style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: 12, color: '#6B7280' }}>
                Add your degrees to display them here on your profile
              </Text>
            </View>
          </View>

          {/* Form Fields */}
          <View style={{ width: '100%', gap: 24 }}>
            <TouchableOpacity onPress={onOpenSearch}>
              <ProfileInput
                label="Add Your Specialist"
                placeholder="Search Your Category"
                value={selectedCategory}
                pointerEvents="none"
              />
            </TouchableOpacity>
            <ProfileInput label="Designation (EG: Senior Pediatric Surgeon)" placeholder="Enter designation" />
            <ProfileInput label="Enter Your Degrees : Separated by (, )" placeholder="Enter Degrees" multiline height={102} />
            <ProfileInput label="Languages You Speak : Separated by (, )" placeholder="Enter Languages" />
            <ProfileInput label="Years Of Experience" placeholder="Number of years" />

            <View style={{ width: '100%', gap: 8 }}>
              <Text style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: 14, color: '#111827' }}>Consultation Fees</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 48, height: 51, backgroundColor: '#E5E7EB', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 16, color: '#1D202F' }}>$</Text>
                </View>
                <View style={{ flex: 1, height: 51, backgroundColor: '#F3F4F6', borderTopRightRadius: 8, borderBottomRightRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 16, justifyContent: 'center' }}>
                  <TextInput placeholder="00" placeholderTextColor="#6B7280" style={{ fontSize: 16, fontWeight: '600', color: '#111827', outlineStyle: 'none' }} />
                </View>
              </View>
            </View>

            <ProfileInput label="Select Country" placeholder="Japan" isDropdown />
            <ProfileInput label="Select Gender" placeholder="Select" isDropdown />

            <TouchableOpacity style={{ height: 56, backgroundColor: '#432C81', borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 14, marginTop: 10 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', lineHeight: 19 }}>Continue</Text>
              <Ionicons name="arrow-forward-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
      {/* Home Indicator */}
      <View style={{ position: 'absolute', bottom: insets.bottom + 8, left: (SCREEN_WIDTH - 134) / 2, width: 134, height: 5, backgroundColor: '#1F2937', borderRadius: 2.5 }} />
    </View>
  );
};


// --- Category Search Screen ---

const CategorySearchScreen = ({ onBack, onSelect }) => {
  const categories = [
    "Dentist",
    "Cardiologist",
    "Neurologist",
    "Pathologist",
    "Orthopedic",
    "Dermatologist"
  ];
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" />

      {/* Top Nav */}
      <View style={{ paddingTop: insets.top + 16, paddingHorizontal: '4.5%', flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <TouchableOpacity
          onPress={onBack}
          style={{ width: 48, height: 48, backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 7, alignItems: 'center', justifyContent: 'center' }}
        >
          <Ionicons name="chevron-back-outline" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: 20, lineHeight: 24, color: '#111827', flex: 1 }}>
          Search Your Category
        </Text>
      </View>

      <View style={{ paddingHorizontal: '4.5%', flex: 1 }}>
        {/* Search Input */}
        <View style={{
          width: '100%',
          height: 56,
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#E5E7EB',
          borderRadius: 8,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          gap: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.09,
          shadowRadius: 37.7,
          elevation: 5,
          marginBottom: 24
        }}>
          <Ionicons name="search-outline" size={24} color="#1D202F" />
          <TextInput
            style={{ flex: 1, fontSize: 16, color: '#111827', outlineStyle: 'none' }}
            placeholder="Search"
            placeholderTextColor="#6B7280"
          />
        </View>

        {/* Category List */}
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ gap: 4 }}>
            {categories.map((cat, index) => (
              <View key={cat} style={{ width: '100%' }}>
                <TouchableOpacity
                  onPress={() => onSelect(cat)}
                  style={{ width: '100%', height: 48, justifyContent: 'center' }}
                >
                  <Text style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: 16, color: '#111827' }}>{cat}</Text>
                </TouchableOpacity>
                {index < categories.length - 1 && (
                  <View style={{ width: '100%', height: 0.5, backgroundColor: '#E5E7EB' }} />
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Home Indicator */}
      <View style={{ position: 'absolute', bottom: insets.bottom + 8, left: (SCREEN_WIDTH - 134) / 2, width: 134, height: 5, backgroundColor: '#1F2937', borderRadius: 2.5 }} />
    </View>
  );
};

// --- Main App ---

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [step, setStep] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('intro'); // 'intro', 'signin', 'signup', 'kyc'
  const [selectedCategory, setSelectedCategory] = useState('');
  const insets = useSafeAreaInsets();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (step === 0) {
      setTimeout(() => setStep(1), 1000); // Logo -> Loading Quote
    } else if (step === 1) {
      // Loading Quote Duration (2.5s)
      setTimeout(() => setStep(2), 2500);
    } else if (step === 2) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => setStep(3), 500); // Go to Step 3 and stop (skip Step 4)
      });
    } else if (step === 3) {
      Animated.timing(overlayAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start(); // Stop at Step 3, no transition to Step 4
    }
  }, [step]);

  const isStep4 = step === 4;
  const isDarkTheme = step === 3; // Step 3 has dark theme
  const isLoadingPhase = step === 1;

  const getBackgroundImage = () => {
    if (step === 2 || step === 3) return require('./assets/role_selection_bg.png');
    if (step === 4) return require('./assets/intro2.png');
    return null;
  };


  if (currentScreen === 'signin') {
    return <SignInScreen
      onSignUpClick={() => setCurrentScreen('signup')}
      onSignIn={() => setCurrentScreen('kyc')}
      onBack={() => setCurrentScreen('intro')}
    />;
  }

  if (currentScreen === 'signup') {
    return <SignUpScreen
      onSignInClick={() => setCurrentScreen('signin')}
      onSignUp={() => setCurrentScreen('kyc')}
      onBack={() => setCurrentScreen('signin')}
    />;
  }

  if (currentScreen === 'kyc') {
    return <KYCScreen
      onBack={() => setCurrentScreen('signin')}
      onSubmit={() => setCurrentScreen('profile')}
    />;
  }

  if (currentScreen === 'profile') {
    return <ProfileManagementScreen
      onBack={() => setCurrentScreen('kyc')}
      onOpenSearch={() => setCurrentScreen('search_category')}
      selectedCategory={selectedCategory}
    />;
  }

  if (currentScreen === 'search_category') {
    return <CategorySearchScreen
      onBack={() => setCurrentScreen('profile')}
      onSelect={(cat) => {
        setSelectedCategory(cat);
        setCurrentScreen('profile');
      }}
    />;
  }

  if (step === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar style="dark" />
        <View
          style={{
            width: 217,
            height: 76,
            backgroundColor: '#5D5980',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 26,
            paddingVertical: 20
          }}
        >
          <Text style={{
            fontFamily: 'Inter',
            fontWeight: '500',
            fontSize: 25,
            lineHeight: 30,
            color: '#FFFFFF',
            textAlign: 'center'
          }}>
            Logo
          </Text>
        </View>
      </View>
    );
  }

  if (isLoadingPhase) {
    return (
      <View style={{ flex: 1, backgroundColor: '#432C81' }}>
        <StatusBar style="light" />

        {/* Vectors from CSS */}
        <View style={{ position: 'absolute', width: 32, height: '50%', left: '25%', bottom: 0, backgroundColor: '#6B7280', opacity: 0.5 }} />
        <View style={{ position: 'absolute', width: 32, height: '25%', right: 0, bottom: 0, backgroundColor: '#6B7280', opacity: 0.3 }} />
        <View style={{ position: 'absolute', width: 32, height: '25%', right: '30%', top: 0, backgroundColor: '#6B7280', opacity: 0.5, transform: [{ scaleY: -1 }] }} />
        <View style={{ position: 'absolute', width: 32, height: '35%', left: 0, top: '10%', backgroundColor: '#6B7280', opacity: 0.3, transform: [{ scaleY: -1 }] }} />

        {/* Quote Frame */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: '4.5%' }}>
          <Text style={{
            fontFamily: 'Inter',
            fontWeight: '600',
            fontSize: 24,
            lineHeight: 29,
            textAlign: 'center',
            color: '#FFFFFF'
          }}>
            Manage Your appointments with precision, transforming the way you connect with your patients.
          </Text>
        </View>

        {/* Home Indicator */}
        <View style={{ position: 'absolute', bottom: insets.bottom + 8, left: (SCREEN_WIDTH - 134) / 2, width: 134, height: 5, backgroundColor: '#FFFFFF', borderRadius: 2.5 }} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style={isDarkTheme ? "light" : "dark"} />

      <Animated.View style={{ flex: 1, width: '100%', height: '100%', opacity: fadeAnim }}>
        <ImageBackground
          source={getBackgroundImage()}
          style={{ flex: 1, alignItems: 'center' }}
          resizeMode="cover"
        >
          {/* Overlay Background */}
          {(step >= 3) && (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              }}
            />
          )}

          {/* Content Overlay */}
          {(step >= 3) && (
            <Animated.View style={{ opacity: overlayAnim, flex: 1, width: '100%', justifyContent: 'flex-end', paddingBottom: insets.bottom + 60, paddingHorizontal: '4.5%' }}>

              {/* Main Text Frame - Replaced absolute top with flex layout */}
              <View style={{ alignItems: 'center', gap: 32, marginBottom: '25%' }}>

                {/* Plain Black Logo Icon Square */}
                <View style={{ width: 48, height: 48, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' }} />


                <View style={{ width: '100%', gap: 12, alignItems: 'center' }}>
                  <Text style={{
                    fontFamily: 'Inter',
                    fontStyle: 'semibold',
                    fontWeight: '600',
                    fontSize: 24,
                    lineHeight: 29,
                    textAlign: 'center',
                    color: '#FFFFFF'
                  }}>
                    Welcome to HealthCare App
                  </Text>
                  <Text style={{
                    fontFamily: 'Inter',
                    fontStyle: 'regular',
                    fontWeight: '400',
                    fontSize: 16,
                    lineHeight: 19,
                    textAlign: 'center',
                    color: '#ffffff8f'
                  }}>
                    Choose how you want to continue
                  </Text>
                </View>
              </View>

              {/* Roles Frame - Replaced absolute top with flex layout */}
              <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 13, width: '100%' }}>
                <RoleButton
                  title="I'm a Doctor"
                  subtitle="Manage Patient,appointments & reports"
                  onPress={() => setCurrentScreen('signin')}
                />
                <RoleButton
                  title="I'm a Patient"
                  subtitle="Book appointments & consult doctors"
                  onPress={() => setCurrentScreen('signin')}
                />
              </View>
            </Animated.View>
          )}

        </ImageBackground>
      </Animated.View>

      {/* Home Indicator */}
      <View style={{ position: 'absolute', bottom: insets.bottom + 8, left: (SCREEN_WIDTH - 134) / 2, width: 134, height: 5, backgroundColor: '#1F2937', borderRadius: 2.5 }} />
    </View>
  );
}
