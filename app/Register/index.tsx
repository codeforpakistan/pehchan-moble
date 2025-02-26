import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SiteHeader from '@/components/header';

enum RegistrationStep {
  EnterContact,
  Verification,
  BasicInfo,
  Success,
}

const isEmail = (value: string) => value.includes('@');

export default function Register() {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>(
    RegistrationStep.EnterContact
  );
  const [contact, setContact] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [cnic, setCNIC] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const code = generateVerificationCode();
    setGeneratedCode(code);
    setVerificationCode(code);

    if (!isEmail(contact)) {
      if (!contact.startsWith('+92')) {
        Alert.alert(
          'Error',
          'Please enter a valid email or phone number (+92XXXXXXXXXX)'
        );
        setIsLoading(false);
        return;
      }
      setPhone(contact);
    } else {
      try {
        // const response = await fetch('/api/send-verification', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ email: contact, code }),
        // });

        // if (!response.ok) {
        //   throw new Error('Failed to send verification email');
        // }

        Alert.alert('Success', 'Verification code sent to your email');
      } catch (error) {
        Alert.alert('Error', 'Failed to send verification email. Please try again.');
        setIsLoading(false);
        return;
      }
    }
    setIsLoading(false);
    setCurrentStep(currentStep + 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case RegistrationStep.EnterContact:
        return (
          <View className="space-y-4">
            <Text className="text-lg">Enter email address or mobile number</Text>
            <TextInput
              className="border p-3 rounded-md mb-4"
              value={contact}
              onChangeText={setContact}
              placeholder="Email or mobile number"
              keyboardType="default"
            />
            <Button
              title="Submit"
              color="#16A34A"
              onPress={handleSubmit}
              disabled={isLoading}
            />
            {isLoading && <ActivityIndicator size="large" color="#16A34A" />}
          </View>
        );
      case RegistrationStep.Verification:
        return (
          <View className="space-y-4">
            <Text className="text-lg">Enter verification code sent to {contact}</Text>
            <TextInput
              className="border p-3 rounded-md mb-4"
              value={verificationCode}
              onChangeText={setVerificationCode}
              placeholder="Enter code"
              keyboardType="numeric"
            />
            <Button
              title="Submit"
              color="#16A34A"
              onPress={() => setCurrentStep(currentStep + 1)}
            />
          </View>
        );
      case RegistrationStep.BasicInfo:
        return (
          <View className="space-y-4">
            <Text className="text-lg">Enter your CNIC</Text>
            <TextInput
              className="border p-3 rounded-md mb-4"
              value={cnic}
              onChangeText={setCNIC}
              placeholder="XXXXX-XXXXXXX-X"
              keyboardType="numeric"
            />
            <Text className="text-lg">Enter your full name</Text>
            <TextInput
              className="border p-3 rounded-md mb-4"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full name as written on CNIC"
            />
            {!isEmail(contact) && (
              <>
                <Text className="text-lg">Enter your email address</Text>
                <TextInput
                  className="border p-3 rounded-md mb-4"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email address"
                  keyboardType="email-address"
                />
              </>
            )}
            {isEmail(contact) && (
              <>
                <Text className="text-lg">Enter your phone number</Text>
                <TextInput
                  className="border p-3 rounded-md mb-4"
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+92XXXXXXXXXX"
                  keyboardType="phone-pad"
                />
              </>
            )}
            <Text className="text-lg">Enter your password</Text>
            <TextInput
              className="border p-3 rounded-md mb-4"
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
            />
            <Button
              title="Submit"
              color="#16A34A"
              onPress={() => setCurrentStep(currentStep + 1)}
            />
          </View>
        );
      case RegistrationStep.Success:
        return (
          <View className="space-y-4">
            <Text className="text-2xl font-semibold text-center">
              Your Pehchan ID has been created successfully
            </Text>
            <Text className="text-center text-gray-500 mb-6">
              Use your email to log in with Pehchan
            </Text>
            <Button
              title="Continue"
              color="#16A34A"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        );
    }
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-green-600/10 to-green-600/20">
      <SiteHeader />
      <View className="flex-1 justify-center items-center p-4">
        <View className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <Text className="text-2xl font-semibold text-center mb-4">
            Create your Pehchan ID
          </Text>
          {renderStep()}
        </View>
      </View>
    </View>
  );
}
